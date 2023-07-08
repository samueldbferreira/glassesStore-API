const mongoose = require("mongoose");

const User = mongoose.model("User", {
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	phone: String,
	admin: Boolean,
});

module.exports = User;
