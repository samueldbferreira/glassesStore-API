const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/cadastro", authControllers.signup);

router.post("/entrar", authControllers.login);

module.exports = router;
