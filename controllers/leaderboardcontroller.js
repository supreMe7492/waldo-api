const { getLeaderboardByImage, getPlayerRankByImage } = require("../db/query");

async function getLeaderboard(req, res, next) {
  try {
    const imgId = req.params.imgId;
    const limit = req.query.limit || 10;

    const leaderboard = await getLeaderboardByImage(imgId, limit);

    res.json({
      success: true,
      data: leaderboard.map((entry, index) => ({
        rank: index + 1,
        name: entry.name,
        timescore: entry.timescore,
        gameId: entry.game.id,
        completedAt: entry.game.started_at,
      })),
    });
  } catch (err) {
    next(err);
  }
}

async function getPlayerRank(req, res, next) {
  try {
    const gmId = req.params.gmId;
    const imgId = req.query.imgId;

    if (!imgId) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required",
      });
    }

    const playerRank = await getPlayerRankByImage(gmId, imgId);

    if (!playerRank) {
      return res.status(404).json({
        success: false,
        message: "Score not found for this game",
      });
    }

    res.json({
      success: true,
      data: {
        rank: playerRank.rank,
        name: playerRank.name,
        timescore: playerRank.timescore,
        gameId: playerRank.gmId,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getLeaderboard, getPlayerRank };
