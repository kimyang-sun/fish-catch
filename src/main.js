"use strict";
import * as sound from "./sound.js";
import PopUp from "./popup.js";

// Game PopUp Class
const gamePopUp = new PopUp();

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
  addItem("fish", "./img/fish.png", FISH_COUNT);
  addItem("urchin", "./img/urchin.png", URCHIN_COUNT);
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
  sound.playBg();
  showPauseIcon();
  showTimerAndCount();
  startTimer();
  fishCount();
  gamePopUp.hidePopUp();
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
    sound.playWin();
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
function stop(reason) {
  stopTimer();
  started = false;
  gamePopUp.showPopUp(reason);
  sound.stopBg();
  if (reason === Reason.pause) {
    sound.playAlert();
    hidePauseIcon();
  } else {
    sound.playLose();
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

// Game ReStart
gamePopUp.setOnClickListener(() => {
  reStart();
});

function reStart() {
  sound.stopWin();
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
    sound.playCatch();
    ++countValue;
    fishCount();
  } else if (target.matches(".urchin")) {
    sound.playLose();
    stop(Reason.lose);
  }
});
