"use strict";
export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".game__popup");
    this.popUpText = document.querySelector(".popup__text");
    this.replayBtn = document.querySelector(".popup__replay__btn");
    this.replayBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
    });
  }

  setOnClickListener(onClick) {
    this.onClick = onClick;
  }

  showPopUp(text) {
    let message;
    switch (text) {
      case "pause":
        message = "Replay❓";
        break;
      case "win":
        message = "You Won 🎉";
        break;
      case "lose":
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
