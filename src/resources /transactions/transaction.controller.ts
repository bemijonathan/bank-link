import { Response, Request } from "express";
import mongoose from "mongoose";
import { TransactionModel } from "../../models.ts/transaction.model";
import usermodel, { User } from "../../models.ts/user.model";
import { CustomError } from "../../utils/error";
import { FormatResponse } from "../../utils/formatResponse";
import { logs } from "../../utils/logger";
let e = new CustomError();
let f = new FormatResponse();

class TransactionController {
	constructor() {}

	async getAll(req: Request, res: Response) {
		try {
			const transactions = await TransactionModel.find({
				_id: req.body.authenticatedUser._id,
			})
				.populate("user")
				.lean();

			f.sendResponse(res, 200, transactions);
		} catch (error) {
			logs.error(error);
			e.unprocessedEntity(res, error);
		}
	}
	getOne() {}
	async createOne(req: Request, res: Response) {
		const session = await mongoose.startSession();
		await session.startTransaction();
		let status = "pending";
		try {
			const senderBalance = await usermodel
				.findById(req.body.authenticatedUser._id)
				.lean()
				.exec();

			const recieverBalance = await usermodel
				.findById(req.body.debitor)
				.lean()
				.exec();

			if (req.body.amount > (senderBalance as User).balance) {
				await usermodel.updateOne(
					{ _id: req.body.creditor },
					{ balance: +(senderBalance as User).balance - req.body.amount },
					{ new: true, session }
				);

				await usermodel.updateOne(
					{ _id: req.body.debitor },
					{ balance: +(recieverBalance as User).balance + req.body.amount },
					{ new: true, session }
				);
				status = "confirmed";
				f.sendResponse(res, 200, "successfully sent " + req.body.amount);
			} else {
				status = "failed";
				throw new Error("insufficient funds");
			}
		} catch (error) {
			await session.abortTransaction();
			e.unprocessedEntity(res, error);
		} finally {
			session.endSession();
			await TransactionModel.create({ ...req.body, status });
		}
	}
	deleteOne() {}
	updateOne() {}
}

export default new TransactionController();
