const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status-codes").StatusCodes;

const checkToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "Acesso negado.",
		});
	}

	try {
		jwt.verify(token, process.env.SECRET);
		return next();
	} catch (err) {
		return res.status(400).json({
			msg: "Token inválido!",
		});
	}
};

module.exports = checkToken;
