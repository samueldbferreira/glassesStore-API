const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const meRouter = require("./routes/meRoutes");
const authRouter = require("./routes/authRoutes");
const addressRouter = require("./routes/addressRoutes");
const usersRouter = require("./routes/usersRoutes");
const productsRouter = require("./routes/productsRoutes");
const ordersRouter = require("./routes/ordersRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/me", meRouter);
app.use("/auth", authRouter);
app.use("/enderecos", addressRouter);
app.use("/usuarios", usersRouter);
app.use("/produtos", productsRouter);
app.use("/pedidos", ordersRouter);

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7o7twza.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
