const Product = require("../models/Product");
const StatusCodes = require("http-status-codes").StatusCodes;

const postProduct = async (req, res) => {
	const {
		name,
		category,
		price,
		installments,
		stock,
		colors,
		description,
		width,
		height,
		stem,
		noseSpace,
		material,
	} = req.body;
	const images = req.files && req.files.map((file) => file.path);
	console.log(images);

	if (
		!name ||
		!category ||
		!price ||
		!installments ||
		!stock ||
		!colors ||
		!description ||
		!width ||
		!height ||
		!stem ||
		!noseSpace ||
		!material ||
		!images
	) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Informe todos os dados necessários." });
	}

	try {
		const product = new Product({
			name,
			category,
			price,
			installments,
			stock,
			colors: JSON.parse(colors),
			description,
			width,
			height,
			stem,
			noseSpace,
			material,
			images,
		});

		await product.save();

		res.status(StatusCodes.CREATED).json({
			msg: "Produto cadastrado com sucesso.",
			data: product,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao cadastrar produto.",
		});
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		return res.status(StatusCodes.OK).json(product);
	} catch (err) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ msg: "Produto não encontrado." });
	}
};

const getAll = async (req, res) => {
	try {
		const products = await Product.find(
			req.query.categoria ? { category: req.query.categoria } : {}
		);
		return res.status(StatusCodes.OK).json(products);
	} catch (err) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Erro ao carregar produtos." });
	}
};

const patchProduct = async (req, res) => {
	const images = req.files && req.files.map((file) => file.path);

	if (req.body.colors) {
		req.body.colors = JSON.parse(req.body.colors);
	}

	try {
		const product = await Product.findById(req.params.id);
		Object.assign(product, { ...req.body, images });
		await product.save();

		return res.status(StatusCodes.CREATED).json({
			msg: "Produto atualizado com sucesso.",
			data: product,
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao cadastrar produto.",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		return res.status(StatusCodes.CREATED).json({
			msg: "Produto excluído com sucesso.",
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao excluir produto.",
		});
	}
};

module.exports = {
	postProduct,
	getProduct,
	getAll,
	patchProduct,
	deleteProduct,
};
