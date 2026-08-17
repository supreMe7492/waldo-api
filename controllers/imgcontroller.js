const { selectImgPath, selectImgs } = require("../db/query");
async function getImagePath(req, res, next) {
  try {
    const image = await selectImgPath(req.params.imgId);
    res.json({ success: true, data: image });
  } catch (err) {
    next(err);
  }
}

async function getAllImage(req, res, next) {
  try {
    const images = await selectImgs();
    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
}

module.exports = { getImagePath, getAllImage };
