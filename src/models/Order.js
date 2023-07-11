const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
	idCustomer: String,
	date: Date,
	total: Number,
	items: [
		{
			id: String,
			name: String,
			price: Number,
			color: String,
			quantity: Number,
			imgSrc: String,
		},
	],
});

module.exports = Order;
