const express = require("express");
const checkToken = require("../middlewares/checkToken");
const meControllers = require("../controllers/meControllers");

const router = express.Router();

router.get("/", checkToken, meControllers.getMe);

router.patch("/", checkToken, meControllers.patchMe);

module.exports = router;
