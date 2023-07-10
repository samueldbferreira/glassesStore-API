const Address = require("../models/Address");
const StatusCodes = require("http-status-codes").StatusCodes;

const deleteAddress = async (req, res) => {
	try {
		await Address.findOneAndDelete({ _id: req.params.id });
		return res
			.status(StatusCodes.OK)
			.json({ msg: "Endereço excluído com sucesso" });
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

const postAddress = async (req, res) => {
	const {
		name,
		cep,
		street,
		number,
		complement,
		district,
		state,
		city,
		reference,
	} = req.body;

	if (!name || !cep || !street || !number || !district || !state || !city) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Informe todos os dados necessários." });
	}

	const address = new Address({
		idCustomer: req.userID,
		name,
		cep,
		street,
		number,
		complement: complement || "",
		district,
		state,
		city,
		reference: reference || "",
	});

	try {
		const newAddress = await address.save();
		return res
			.status(StatusCodes.CREATED)
			.json({ msg: `Endereço cadastrado com sucesso.`, data: newAddress });
	} catch (e) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

const patchAddress = async (req, res) => {
	const {
		name,
		cep,
		street,
		number,
		complement,
		district,
		state,
		city,
		reference,
	} = req.body;

	if (!name || !cep || !street || !number || !district || !state || !city) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Informe todos os dados necessários." });
	}

	const address = await Address.findById(req.params.id);

	if (!address) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Endereço não encontrado" });
	}

	Object.assign(address, req.body);

	try {
		address.save();
		return res
			.status(StatusCodes.OK)
			.json({ msg: "Endereço atualizado com sucesso", data: address });
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

const getAddresses = async (req, res) => {
	try {
		const addresses = await Address.find({ idCustomer: req.userID });
		return res.status(StatusCodes.OK).json(addresses);
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro no servidor." });
	}
};

module.exports = {
	deleteAddress,
	patchAddress,
	postAddress,
	getAddresses,
};
