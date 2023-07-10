const User = require("../models/User");
const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes").StatusCodes;

const getMe = async (req, res) => {
	const { _id, firstName, lastName, email, phone, admin } = await User.findById(
		req.userID
	);

	res
		.status(StatusCodes.OK)
		.json({ _id, firstName, lastName, email, phone, admin });
};

const patchMe = async (req, res) => {
	try {
		if (req.body.email) {
			const userExists = await User.findOne({ email: req.body.email });

			if (userExists) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "Este email já está sendo utilizado." });
			}
		}

		if (req.body.password) {
			const salt = await bcrypt.genSalt(12);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		const user = await User.findById(req.userID);
		Object.assign(user, req.body);
		user.save();

		return res.status(StatusCodes.OK).json({
			msg: "Usuário atualizado com sucesso.",
			data: user,
		});
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

module.exports = {
	getMe,
	patchMe,
};
