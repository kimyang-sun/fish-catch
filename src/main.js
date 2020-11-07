"use strict";
import PopUp from "./popup.js";
import { Game } from "./game.js";
import * as sound from "./sound.js";

// Game PopUp Class
const gamePopUp = new PopUp();

const FISH_COUNT = 15;
const URCHIN_COUNT = 5;
const FISH_SIZE_X = 100;
const FISH_SIZE_Y = 56;
const GAME_DURATION = 10;

// Game Class
const game = new Game(
  GAME_DURATION,
  FISH_COUNT,
  URCHIN_COUNT,
  FISH_SIZE_X,
  FISH_SIZE_Y
);

// Game restart
gamePopUp.setClickListener(() => {
  game.restart();
});

// PopUp Lisetener
game.setShowPopUpListener(reason => {
  gamePopUp.showPopUp(reason);
});

game.setHidePopUpListener(() => {
  gamePopUp.hidePopUp();
});
