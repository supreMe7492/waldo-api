const { selectImgCharacters } = require("../db/query");

async function getImgCh(req, res, next) {
  try {
    const characters = await selectImgCharacters(req.params.imgId);
    res.json({ success: "true", data: characters });
  } catch (err) {
    next(err);
  }
}

module.exports = { getImgCh };
