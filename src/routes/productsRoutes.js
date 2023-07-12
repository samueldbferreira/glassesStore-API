const express = require("express");
const checkToken = require("../middlewares/checkToken");
const checkAdmin = require("../middlewares/checkAdmin");
const upload = require("../config/multer");
const productsControllers = require("../controllers/productsControllers");

const router = express.Router();

router.post(
	"/",
	checkToken,
	checkAdmin,
	upload.array("images"),
	productsControllers.postProduct
);

router.get("/:id", productsControllers.getProduct);

router.get("/", productsControllers.getAll);

router.patch(
	"/:id",
	checkToken,
	checkAdmin,
	upload.array("images"),
	productsControllers.patchProduct
);

router.delete("/:id", productsControllers.deleteProduct);

module.exports = router;
