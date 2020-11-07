"use strict";
import PopUp from "./popup.js";
import { GameBuilder } from "./game.js";

// Game PopUp Class
const gamePopUp = new PopUp();

// Game Class
const game = new GameBuilder()
  .gameDuration(5)
  .fishCount(10)
  .urchinCount(5)
  .fishSizeX(100)
  .fishSizeY(56)
  .build();

// Game restart Listener
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
