const { Router } = require("express");
const { getImagePath } = require("../controllers/imgcontroller");
const img = Router();
img.get("/:imgId", getImagePath);

module.exports = img;
