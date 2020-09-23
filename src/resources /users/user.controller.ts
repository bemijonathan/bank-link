import { Request, Response } from "express";
import usermodel from "../../models.ts/user.model";
import { CustomError } from "../../utils/error";
import { FormatResponse } from "../../utils/formatResponse";
import { logs } from "../../utils/logger";

const f = new FormatResponse();
const e = new CustomError();
export class UserController {
	static async updateUser(req: Request, res: Response) {
		try {
			let update = await usermodel
				.findByIdAndUpdate(
					req.body.authenticatedUser._id,
					{ ...req.body },
					{ new: true }
				)
				.select("email name total");
			f.sendResponse(res, 200, update);
		} catch (error) {
			logs.error(error);
			e.serverError(res, error);
		}
	}
	static async getUser(req: Request, res: Response) {
		try {
			try {
				let user = await usermodel
					.findById(req.body.authenticatedUser._id)
					.select("name email phone country total");
				f.sendResponse(res, 200, user);
			} catch (error) {
				logs.error(error);
			}
		} catch (error) {
			e.clientError(res, error);
		}
	}
}
