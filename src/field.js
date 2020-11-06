"use strict";
import * as sound from "./sound.js";
export class Field {
  constructor(fishCount, urchinCount, fishSizeX, fishSizeY, isGameRunning) {
    this.fishCount = fishCount;
    this.urchinCount = urchinCount;
    this.fishSizeX = fishSizeX;
    this.fishSizeY = fishSizeY;
    this.isGameRunning = isGameRunning;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", event => {
      this.onClick(event);
    });
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  initImage() {
    this.field.innerHTML = "";
    this.addItem("fish", "./img/fish.png", this.fishCount);
    this.addItem("urchin", "./img/urchin.png", this.urchinCount);
  }

  addItem(imgName, imgSrc, count) {
    const fieldWidth = this.fieldRect.width;
    const fieldHeight = this.fieldRect.height;
    const rangeX = fieldWidth - this.fishSizeX;
    const rangeY = fieldHeight - this.fishSizeY;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", imgName);
      item.setAttribute("alt", imgName);
      item.setAttribute("src", imgSrc);
      const x = Math.random() * rangeX;
      const y = Math.random() * rangeY;
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.field.appendChild(item);
    }
  }
  onClick(event) {
    if (!this.isGameRunning()) return;
    const target = event.target;
    if (target.matches(".fish")) {
      target.remove();
      sound.playCatch();
      this.onItemClick && this.onItemClick("fish");
    } else if (target.matches(".urchin")) {
      sound.playLose();
      this.onItemClick && this.onItemClick("urchin");
    }
  }
}
