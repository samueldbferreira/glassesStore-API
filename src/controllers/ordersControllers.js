const Order = require("../models/Order");
const Product = require("../models/Product");
const StatusCodes = require("http-status-codes").StatusCodes;

const postOrder = async (req, res) => {
	const { total, items } = req.body;

	if (!total || !items) {
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Faltam dados." });
	}
	const date = new Date();

	try {
		items.forEach(async (i) => {
			const item = await Product.findById(i.id.split(",")[0]);
			Object.assign(item, { ...item, stock: item.stock - i.quantity });
			item.save();
		});

		const order = await Order.create({
			idCustomer: req.userID,
			total,
			date,
			items,
		});

		await order.save();

		return res.status(StatusCodes.CREATED).json({
			msg: "Pedido realizado com sucesso.",
			data: order,
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao realizar pedido.",
		});
	}
};

const getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ idCustomer: req.params.id });
		return res.status(StatusCodes.OK).json(orders);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao buscar pedidos.",
		});
	}
};

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({ idCustomer: req.userID });
		return res.status(StatusCodes.OK).json(orders);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Erro ao realizar pedido.",
		});
	}
};

module.exports = {
	postOrder,
	getUserOrders,
	getOrders,
};
