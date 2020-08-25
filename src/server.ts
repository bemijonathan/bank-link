import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser());

app.get("/", (req: Request, res: Response) => {
	res.status(400).send({
		data: "this is awesome",
	});
});

export default app;
