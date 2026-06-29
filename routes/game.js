const { Router } = require("express");
const {
  startGame,
  checkFound,
  completeGame,
} = require("../controllers/gamecontroller");
const game = Router();

game.post("/start/:imgId", startGame);
game.post("/guess", checkFound);
game.post("/complete", completeGame);
module.exports = game;
