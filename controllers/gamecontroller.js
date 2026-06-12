const { insertGame, insertFound, selectCharacter } = require("../db/query");
const ch = require("../routes/chr");

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

async function checkFound(req, res, next) {
  const chId = req.body.chId;
  console.log(req.headers.cookie);
  const gameId = req.cookies.gameId;
  const characterDet = await selectCharacter(chId);
  const cordsx = characterDet.cordsx;
  const cordsy = characterDet.cordsy;
  const clickx = parseFloat(req.body.cordsx);
  const clicky = parseFloat(req.body.cordsy);
  const dx = Math.abs(cordsx - clickx);
  const dy = Math.abs(cordsy - clicky);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const radius = 0.03;
  if (distance <= radius) {
    await insertFound(chId, gameId);
    res.json({ success: true, message: "found the character" });
  } else {
    res.json({ success: true, message: "not the character" });
  }
}

module.exports = { startGame, checkFound };
