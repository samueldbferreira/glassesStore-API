const express = require("express");
const checkToken = require("../middlewares/checkToken");
const checkAdmin = require("../middlewares/checkAdmin");
const usersControllers = require("../controllers/usersControllers");

const router = express.Router();

router.delete("/:id", checkToken, checkAdmin, usersControllers.deleteUser);
router.get("/:id", checkToken, checkAdmin, usersControllers.getUser);
router.get("/", checkToken, checkAdmin, usersControllers.getAll);

module.exports = router;
