const express = require("express");
const checkToken = require("../middlewares/checkToken");
const ordersControllers = require("../controllers/ordersControllers");

const router = express.Router();

router.post("/", checkToken, ordersControllers.postOrder);

router.get("/:id", checkToken, ordersControllers.getUserOrders);

router.get("/", checkToken, ordersControllers.getOrders);

module.exports = router;
