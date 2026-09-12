const {
  insertGame,
  insertFound,
  selectCharacter,
  selectfoundCharacter,
  selectGameImg,
  selecAllFound,
  insertEndTime,
  insertScore,
  selectImgCharacters,
} = require("../db/query");
const ch = require("../routes/chr");

async function startGame(req, res, next) {
  try {
    const gameSess = await insertGame(req.params.imgId);
    res.cookie("gameId", gameSess.id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
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
  const radius = 0.035;

  if (gameDet.imgId !== characterDet.imgId) {
    return res.status(400).json({
      success: false,
      message: "character not in this image",
    });
  }
  if (distance > radius) {
    return res.json({
      success: true,
      found: false,
      message: "not the character",
    });
  }

  const isFound = await selectfoundCharacter(chId, gameId);

  if (isFound) {
    return res.status(409).json({
      success: false,
      message: "already found",
    });
  }
  await insertFound(chId, gameId);
  const allFound = await selecAllFound(gameId);
  const allChIdDet = await selectImgCharacters(gameDet.imgId);
  const allChId = allChIdDet.map((ch) => ch.id);
  const allFoundId = allFound.map((ch) => ch.chId);
  const notFoundId = allChId.filter((chId) => !allFoundId.includes(chId));
  if (allFound.length == 3) {
    await insertEndTime(gameId);
    return res.json({
      success: true,
      found: true,
      completed: true,
      message: "completed game sucessfully",
    });
  }
  res.json({
    success: true,
    found: true,
    completed: false,
    notFoundIds: notFoundId,
    message: "found the character",
  });
}

async function completeGame(req, res, next) {
  try {
    const gameId = req.cookies.gameId;
    const { playerName } = req.body;

    if (!playerName) {
      return res.status(400).json({
        success: false,
        message: "Player name is required",
      });
    }

    const gameDet = await selectGameImg(gameId);

    if (!gameDet) {
      return res.status(404).json({
        success: false,
        message: "Game session not found",
      });
    }

    if (!gameDet.ended_at) {
      return res.status(400).json({
        success: false,
        message: "Game has not been completed yet",
      });
    }

    // Calculate time taken in milliseconds
    const timeScore = gameDet.ended_at.getTime() - gameDet.started_at.getTime();

    const score = await insertScore(gameId, playerName, timeScore);

    res.json({
      success: true,
      message: "Score saved successfully",
      data: {
        gameId: score.gmId,
        playerName: score.name,
        timeScore: score.timescore,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { startGame, checkFound, completeGame };
