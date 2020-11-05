"use strict";
const FISH_COUNT = 15;
const URCHIN_COUNT = 5;
const FISH_SIZE_X = 100;
const FISH_SIZE_Y = 56;
const GAME_DURATION = 5;

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
      stop();
      clearInterval(timerValue);
    }
  }, 1000);
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  const minuteTime = `0${minute}`.substr(-2);
  const secondTime = `0${second}`.substr(-2);
  timer.innerHTML = `${minuteTime}:${secondTime}`;
}

// Game Stop
function stop(reason) {
  stopTimer();
  started = false;
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

// 게임 재시작
function reStart() {
  gameBtn.style.visibility = "visible";
  started = true;
  initImage();
  start();
}
