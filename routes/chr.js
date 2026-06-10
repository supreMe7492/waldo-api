const { Router } = require("express");
const { getImgCh } = require("../controllers/chcontroller");
const ch = Router();

ch.get("/:imgId", getImgCh);

module.exports = ch;
