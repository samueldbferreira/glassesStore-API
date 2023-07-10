const User = require("../models/User");
const StatusCodes = require("http-status-codes").StatusCodes;

const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(StatusCodes.OK).json({ msg: "Usuário excluído com sucesso." });
	} catch (e) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Usuário não encontrado." });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.status(StatusCodes.OK).json(user);
	} catch (err) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Usuário não encontrado." });
	}
};

const getAll = async (_, res) => {
	try {
		const users = await User.find({ admin: false });
		return res.status(StatusCodes.OK).json(users);
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

module.exports = {
	deleteUser,
	getUser,
	getAll,
};
