const { insertGame } = require("../db/query");

async function startGame(req, res, next) {
  try {
    const gameSess = await insertGame(req.params.imgId);
    res.cookie("gameId", gameSess.id, {
      httpOnly: true,
    });
    res.json({ success: true, message: "Game started" });
  } catch (err) {
    next(err);
  }
}

module.exports = { startGame };
