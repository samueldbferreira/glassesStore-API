const express = require("express");
const addressControllers = require("../controllers/addressControllers");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.patch("/:id", checkToken, addressControllers.patchAddress);

router.delete("/:id", checkToken, addressControllers.deleteAddress);

router.get("/", checkToken, addressControllers.getAddresses);

router.post("/", checkToken, addressControllers.postAddress);

module.exports = router;
