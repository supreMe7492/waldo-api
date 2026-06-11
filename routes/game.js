const { Router } = require("express");
const { startGame } = require("../controllers/gamecontroller");
const gameSession = Router();

gameSession.post("/:imgId", startGame);

module.exports = gameSession;
