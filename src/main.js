"use strict";
const FISH_COUNT = 15;
const URCHIN_COUNT = 5;
const FISH_SIZE_X = 100;
const FISH_SIZE_Y = 56;

let started = false;

// Game Field
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initImage() {
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
