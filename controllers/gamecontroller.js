const {
  insertGame,
  insertFound,
  selectCharacter,
  selectfoundCharacter,
  selectGameImg,
} = require("../db/query");
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

function calculateDistance(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

async function checkFound(req, res, next) {
  const chId = req.body.chId;
  const gameId = req.cookies.gameId;
  const characterDet = await selectCharacter(chId);
  const cordsx = characterDet.cordsx;
  const cordsy = characterDet.cordsy;
  const clickx = parseFloat(req.body.cordsx);
  const clicky = parseFloat(req.body.cordsy);
  const distance = calculateDistance(cordsx, cordsy, clickx, clicky);
  const gameDet = await selectGameImg(gameId);
  console.log(characterDet);
  const radius = 0.03;

  // Guard clause: wrong image
  if (gameDet.imgId !== characterDet.imgId) {
    return res.status(400).json({
      success: false,
      message: "character not in this image",
    });
  }

  // Guard clause: too far away
  if (distance > radius) {
    return res.json({
      success: true,
      found: false,
      message: "not the character",
    });
  }

  // Main logic: check if already found
  const isFound = await selectfoundCharacter(chId, gameId);
  if (isFound) {
    return res.status(409).json({
      success: false,
      message: "already found",
    });
  }

  // Success path
  await insertFound(chId, gameId);
  res.json({
    success: true,
    found: true,
    message: "found the character",
  });
}

module.exports = { startGame, checkFound };
