const User = require("../models/User");
const StatusCodes = require("http-status-codes").StatusCodes;

const checkAdmin = async (req, res, next) => {
	const user = await User.findById(req.userID);

	if (user.admin) {
		return next();
	} else {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Acesso negado." });
	}
};

module.exports = checkAdmin;
