const { Router } = require("express");
const { getImagePath, getAllImage } = require("../controllers/imgcontroller");
const img = Router();
img.get("/", getAllImage);
img.get("/:imgId", getImagePath);

module.exports = img;
