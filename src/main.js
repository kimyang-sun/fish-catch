"use strict";
const FISH_COUNT = 15;
const URCHIN_COUNT = 5;
const FISH_SIZE_X = 100;
const FISH_SIZE_Y = 56;
const GAME_DURATION = 10;

let gameDuration = GAME_DURATION;
let started = false;

const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});

// Game Field
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initImage() {
  field.innerHTML = "";
  addItem("fish", "img/fish.png", 15);
  addItem("urchin", "img/urchin.png", 5);
}

function addItem(imgName, imgSrc, count) {
  const fieldWidth = fieldRect.width;
  const fieldHeight = fieldRect.height;
  const rangeX = fieldWidth - FISH_SIZE_X;
  const rangeY = fieldHeight - FISH_SIZE_Y;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", imgName);
    item.setAttribute("alt", imgName);
    item.setAttribute("src", imgSrc);
    const x = Math.random() * rangeX;
    const y = Math.random() * rangeY;
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    field.appendChild(item);
  }
}

// Game start
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");
const gameBtn = document.querySelector(".game__btn");
let timerValue = undefined;
let countValue = 0;

gameBtn.addEventListener("click", () => {
  if (started) {
    stop(Reason.pause);
  } else {
    started = true;
    start();
  }
});

function start() {
  if (field.innerHTML === "") initImage();
  showPauseIcon();
  showTimerAndCount();
  startTimer();
  fishCount();
  hidePopUp();
}

function showPauseIcon() {
  const playIcon = document.querySelector(".fa-play");
  playIcon.classList.replace("fa-play", "fa-pause");
}

function showTimerAndCount() {
  timer.classList.add("on");
  count.classList.add("on");
}

function startTimer() {
  updateTimerText(gameDuration);
  timerValue = setInterval(() => {
    updateTimerText(--gameDuration);
    if (gameDuration <= 0) {
      stop(Reason.lose);
      clearInterval(timerValue);
    }
  }, 1000);
}

function fishCount() {
  count.innerHTML = FISH_COUNT - countValue;
  if (FISH_COUNT === countValue) {
    stop(Reason.win);
  }
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  const minuteTime = `0${minute}`.substr(-2);
  const secondTime = `0${second}`.substr(-2);
  timer.innerHTML = `${minuteTime}:${secondTime}`;
}

// Game Stop
const popUp = document.querySelector(".game__popup");
const popUpText = document.querySelector(".popup__text");
const replayBtn = document.querySelector(".popup__replay__btn");

function stop(reason) {
  stopTimer();
  started = false;
  showPopUp(reason);
  if (reason === Reason.pause) {
    hidePauseIcon();
  } else {
    hideGameBtn();
  }
}

function stopTimer() {
  clearInterval(timerValue);
}

function hidePauseIcon() {
  const pauseIcon = document.querySelector(".fa-pause");
  pauseIcon.classList.replace("fa-pause", "fa-play");
}

function hideGameBtn() {
  hidePauseIcon();
  gameBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  let message;
  switch (text) {
    case Reason.pause:
      message = "Replay❓";
      break;
    case Reason.win:
      message = "You Won 🎉";
      break;
    case Reason.lose:
      message = "You Lost 💀";
      break;
    default:
      throw new Error("not valued reason");
  }
  popUpText.innerHTML = message;
  popUp.classList.add("on");
}

function hidePopUp() {
  popUp.classList.remove("on");
}

// Game ReStart
replayBtn.addEventListener("click", () => {
  reStart();
});

function reStart() {
  gameBtn.style.visibility = "visible";
  started = true;
  gameDuration = GAME_DURATION;
  countValue = 0;
  initImage();
  start();
}

// Fish Click
field.addEventListener("click", event => {
  if (!started) return;
  const target = event.target;
  if (target.matches(".fish")) {
    target.remove();
    ++countValue;
    fishCount();
  } else if (target.matches(".urchin")) {
    stop(Reason.lose);
  }
});
