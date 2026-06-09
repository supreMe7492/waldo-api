const { selectImg } = require("../db/query");
async function getImage(req, res, next) {
  try {
    const image = await selectImg(req.params.imgId);
    res.json({ success: true, data: image });
  } catch (err) {
    next(err);
  }
}

module.exports = { getImage };
