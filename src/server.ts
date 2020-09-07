import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connect } from "./models.ts";
import { newPassword, resetPassword, signIn, signUp } from "./utils/authRoutes";
import transactionRoute from "./resources /transactions/transaction.route";

const app = express();

app.use(bodyParser.json());

connect();

app.get("/", (req, res) => {
	res.status(200).json({ status: true, message: "server is up and running" });
});

app.post("/signup", signUp);
app.post("/signin", signIn);
app.post("/reset-password", resetPassword);
app.post("/new-password", newPassword);
app.use("/transaction", transactionRoute);

export default app;
