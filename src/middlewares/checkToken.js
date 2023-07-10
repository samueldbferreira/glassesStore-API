const jwt = require("jsonwebtoken");
const User = require("../models/User");
const StatusCodes = require("http-status-codes").StatusCodes;

const checkToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "Acesso negado.",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req.userID = (await User.findById(decoded.id))._id;
		return next();
	} catch (err) {
		return res.status(400).json({
			msg: "Token inválido!",
		});
	}
};

module.exports = checkToken;
