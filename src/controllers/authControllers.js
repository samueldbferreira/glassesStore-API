const User = require("../models/User");
const bcrypt = require("bcrypt");
const StatusCodes = require("http-status-codes").StatusCodes;
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Informe todos os dados necessários." });
	}

	const userExists = await User.findOne({ email: email });
	if (userExists) {
		return res.status(422).json({ msg: "Email já cadastrado." });
	}

	const salt = await bcrypt.genSalt(12);
	const newPassword = await bcrypt.hash(password, salt);

	const user = new User({
		firstName,
		lastName,
		email,
		password: newPassword,
		admin: false,
	});

	try {
		await user.save();
		return res
			.status(StatusCodes.CREATED)
			.json({ msg: "Usuário cadastrado com sucesso." });
	} catch (e) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Informe todos os dados necessários." });
	}

	const user = await User.findOne({ email: email });
	if (!user) {
		return res.status(422).json({ msg: "Usuário não encontrado." });
	}

	const checkPassword = await bcrypt.compare(password, user.password);
	if (!checkPassword) {
		return res.status(422).json({ msg: "Senha inválida." });
	}

	try {
		const secret = process.env.SECRET;
		const token = jwt.sign({ id: user._id }, secret);

		return res.status(StatusCodes.OK).json({
			msg: "Usuário autenticado com sucesso",
			token,
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro no servidor.",
		});
	}
};

module.exports = {
	signup,
	login,
};
