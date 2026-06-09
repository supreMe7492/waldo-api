const { selectImgPath } = require("../db/query");
async function getImagePath(req, res, next) {
  try {
    const image = await selectImgPath(req.params.imgId);
    res.json({ success: true, data: image });
  } catch (err) {
    next(err);
  }
}

module.exports = { getImagePath };
