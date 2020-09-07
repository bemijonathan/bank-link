import { Router } from "express";
import { ValidateTransaction } from "../../models.ts/transaction.model";
import { authenticate } from "../../utils/auth";
import transactionController from "./transaction.controller";

const transactionRoute = Router();

transactionRoute
	.route("/")
	/**
	 * this gets all the user transactions
	 */
	.get(authenticate, transactionController.getAll)
	.post(ValidateTransaction, authenticate, transactionController.createOne);

export default transactionRoute;
