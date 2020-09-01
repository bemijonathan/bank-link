import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connect } from "./models.ts";

const app = express();

app.use(bodyParser.json());

connect();

app.get("/", (req, res) => {
	res.status(200).json({ status: true, message: "server is up and running" });
});

export default app;
