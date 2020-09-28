import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connect } from "./models.ts";
import { Routes } from "./routes";
import swaggerDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
connect();

const swaggerjsdoc = swaggerDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerjsdoc));

app.get("/", (req, res) => {
	res.status(200).json({ status: true, message: "server is up and running" });
});

Routes(app);

export default app;
