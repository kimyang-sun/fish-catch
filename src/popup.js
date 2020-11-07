"use strict";
import { Reason } from "./game.js";
import * as sound from "./sound.js";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".game__popup");
    this.popUpText = document.querySelector(".popup__text");
    this.replayBtn = document.querySelector(".popup__replay__btn");
    this.replayBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showPopUp(reason) {
    let message;
    switch (reason) {
      case Reason.pause:
        sound.playAlert();
        message = "Replay❓";
        break;
      case Reason.win:
        sound.playWin();
        message = "You Won 🎉";
        break;
      case Reason.lose:
        sound.playLose();
        message = "You Lost 💀";
        break;
      default:
        throw new Error("not valued reason");
    }
    this.popUpText.innerHTML = message;
    this.popUp.classList.add("on");
  }

  hidePopUp() {
    this.popUp.classList.remove("on");
  }
}
