"use strict";
import * as sound from "./sound.js";
import PopUp from "./popup.js";
import { Field } from "./field.js";

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

// Game Field Class
const gameField = new Field(
  FISH_COUNT,
  URCHIN_COUNT,
  FISH_SIZE_X,
  FISH_SIZE_Y,
  () => started
);

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
  if (gameField.field.innerHTML === "") gameField.initImage();
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
gamePopUp.setClickListener(() => {
  reStart();
});

function reStart() {
  sound.stopWin();
  gameBtn.style.visibility = "visible";
  started = true;
  gameDuration = GAME_DURATION;
  countValue = 0;
  gameField.initImage();
  start();
}

gameField.setClickListener(onItemClick);
function onItemClick(item) {
  if (item === "fish") {
    ++countValue;
    fishCount();
  } else if (item === "urchin") {
    stop(Reason.lose);
  }
}
