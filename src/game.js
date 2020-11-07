"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});
export class Game {
  constructor(gameDuration, fishCount, urchinCount, fishSizeX, fishSizeY) {
    this.GAME_DURATION = gameDuration;
    this.gameDuration = gameDuration;
    this.timer = document.querySelector(".timer");
    this.count = document.querySelector(".count");
    this.gameBtn = document.querySelector(".game__btn");
    this.timerValue = undefined;
    this.countValue = 0;
    this.started = false;
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.pause);
      } else {
        this.started = true;
        this.start();
      }
    });
    this.gameField = new Field(
      fishCount,
      urchinCount,
      fishSizeX,
      fishSizeY,
      () => this.started
    );
    this.gameField.setClickListener(this.onItemClick);
  }

  setShowPopUpListener(onShowPopUp) {
    this.onShowPopUp = onShowPopUp;
  }

  setHidePopUpListener(onHidePopUp) {
    this.onHidePopUp = onHidePopUp;
  }

  onItemClick = item => {
    if (item === ItemType.fish) {
      ++this.countValue;
      this.fishCount();
    } else if (item === ItemType.urchin) {
      this.stop(Reason.lose);
    }
  };

  // Game Start
  start() {
    if (this.gameField.field.innerHTML === "") this.gameField.initImage();
    sound.playBg();
    this.showPauseIcon();
    this.showTimerAndCount();
    this.startTimer();
    this.fishCount();
    this.onHidePopUp();
  }

  showPauseIcon() {
    const playIcon = document.querySelector(".fa-play");
    playIcon.classList.replace("fa-play", "fa-pause");
  }

  showTimerAndCount() {
    this.timer.classList.add("on");
    this.count.classList.add("on");
  }

  startTimer() {
    this.updateTimerText(this.gameDuration);
    this.timerValue = setInterval(() => {
      this.updateTimerText(--this.gameDuration);
      if (this.gameDuration <= 0) {
        this.stop(Reason.lose);
        clearInterval(this.timerValue);
      }
    }, 1000);
  }

  fishCount() {
    this.count.innerHTML = this.gameField.fishCount - this.countValue;
    if (this.gameField.fishCount === this.countValue) {
      sound.playWin();
      this.stop(Reason.win);
    }
  }

  updateTimerText(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const minuteTime = `0${minute}`.substr(-2);
    const secondTime = `0${second}`.substr(-2);
    this.timer.innerHTML = `${minuteTime}:${secondTime}`;
  }

  // Game Stop
  stop(reason) {
    this.stopTimer();
    this.started = false;
    this.onShowPopUp(reason);
    sound.stopBg();
    if (reason === Reason.pause) {
      sound.playAlert();
      this.hidePauseIcon();
    } else {
      this.hideGameBtn();
    }
  }

  stopTimer() {
    clearInterval(this.timerValue);
  }

  hidePauseIcon() {
    const pauseIcon = document.querySelector(".fa-pause");
    pauseIcon.classList.replace("fa-pause", "fa-play");
  }

  hideGameBtn() {
    this.hidePauseIcon();
    this.gameBtn.style.visibility = "hidden";
  }

  // Game Restart
  restart() {
    sound.stopWin();
    this.gameBtn.style.visibility = "visible";
    this.started = true;
    this.gameDuration = this.GAME_DURATION;
    this.countValue = 0;
    this.gameField.initImage();
    this.start();
  }
}
