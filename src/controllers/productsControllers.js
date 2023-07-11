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
	console.log(req.query.categoria);

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

module.exports = {
	postProduct,
	getProduct,
	getAll,
};
