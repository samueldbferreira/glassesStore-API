const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
	name: String,
	category: String,
	price: Number,
	installments: Number,
	stock: Number,
	colors: [
		{
			colorName: String,
			colorHexa: String,
		},
	],
	description: String,
	width: Number,
	height: Number,
	stem: Number,
	noseSpace: Number,
	material: String,
	images: [String],
});

module.exports = Product;
