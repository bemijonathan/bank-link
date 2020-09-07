import { NextFunction, Request, Response } from "express";
import Joi, { string } from "joi";
import moongoose, { Document } from "mongoose";
import { join } from "path";

export interface Transaction extends Document {
	debitor: string;
	creditor: string;
	amount: number;
	status: "confirmed" | "failed" | "pending";
}

const TransactionSchema = new moongoose.Schema({
	debitor: {
		type: moongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "user",
	},
	creditor: {
		type: moongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "user",
	},
	amount: {
		type: Number,
		required: true,
		min: 0,
	},
	status: {
		type: String,
		default: "pending",
	},
});

export const TransactionModel = moongoose.model(
	"transaction",
	TransactionSchema
);

export const ValidateTransaction = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validate = Joi.object({
		debitor: Joi.string().required(),
		creditor: Joi.string().required(),
		amount: Joi.number().min(0).required(),
	});
	try {
		validate.validate(req.body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		res.json(400).send({ error });
	}
};
