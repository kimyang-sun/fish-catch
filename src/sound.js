"use strict";
const alertSound = new Audio("./sound/alert.wav");
const winSound = new Audio("./sound/win.wav");
const loseSound = new Audio("./sound/lose.wav");
const catchSound = new Audio("./sound/catch.wav");
const bgSound = new Audio("./sound/bg.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

export function playAlert() {
  alertSound.volume = 0.5;
  playSound(alertSound);
}

export function playWin() {
  winSound.volume = 0.3;
  playSound(winSound);
}

export function stopWin() {
  stopSound(winSound);
}

export function playLose() {
  loseSound.volume = 0.4;
  playSound(loseSound);
}

export function playCatch() {
  catchSound.volume = 0.5;
  playSound(catchSound);
}

export function playBg() {
  bgSound.volume = 0.2;
  playSound(bgSound);
}

export function stopBg() {
  stopSound(bgSound);
}
