const { Router } = require("express");
const { startGame, checkFound } = require("../controllers/gamecontroller");
const game = Router();

game.post("/start/:imgId", startGame);
game.post("/guess", checkFound);
module.exports = game;
