const { Router } = require("express");
const {
  getLeaderboard,
  getPlayerRank,
} = require("../controllers/leaderboardcontroller");
const leaderboard = Router();

// Get top scores for a specific image
leaderboard.get("/image/:imgId", getLeaderboard);

// Get player's rank for a specific image
leaderboard.get("/rank/:gmId", getPlayerRank);

module.exports = leaderboard;
