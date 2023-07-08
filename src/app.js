const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

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
