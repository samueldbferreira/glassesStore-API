const mongoose = require("mongoose");

const Address = mongoose.model("Address", {
	id: String,
	idCustomer: String,
	name: String,
	cep: String,
	street: String,
	number: String,
	complement: String,
	district: String,
	state: String,
	city: String,
	reference: String,
});

module.exports = Address;
