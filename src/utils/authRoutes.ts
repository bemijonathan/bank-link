import Users, { User } from "../models.ts/user.model";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { generateToken, validatepassword, hashedpassword } from "./auth";
import { FormatResponse } from "./formatResponse";
import { CustomError } from "./error";
import { logs } from "./logger";
import { verifyToken } from "./auth";
import { mailer } from "./emails";
import { hash } from "bcrypt";

let f = new FormatResponse();
let e = new CustomError();

export const signUp = async (req: Request, res: Response) => {
	try {
		let user: User = await Users.create(req.body);
		let token = generateToken(user.id, user.admin);

		const message = {
			text:
				"Welcome to Telegraph BTC  don't forget to Join our whatsapp group. https://chat.whatsapp.com/GeAN5QtymN3CIag0OXH5oJ",
			from: "TELEGRAPHBTC <support@cointelegraphbitcoin.com>",
			to: `<${req.body.email}>`,
			subject: "WELCOME TO COINTELEGRAPHBTC",
		};

		mailer.send(message);

		f.sendResponse(res, 201, { email: user.email, token });
	} catch (error) {
		if (error.name === "MongoError" && error.code === 11000) {
			e.clientError(res, "user with credentials already exist");
		} else {
			e.clientError(res, error.message);
		}
	}
};

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return e.clientError(res, "missing fields");
	}
	try {
		let user: User | null = await Users.findOne({ email: req.body.email });
		if (user) {
			if (validatepassword(password, user.password)) {
				let token = generateToken(user.id, user.admin);
				f.sendResponse(res, 201, token);
			} else {
				e.clientError(res, "incorrect username or password");
			}
		} else {
			e.notfound(res, "incorrect username or passwords");
		}
	} catch (error) {
		logs.error(error);
		e.clientError(res, "");
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const user = await Users.findOne({ email: req.body.email });

		if (user) {
			let token = generateToken(user.id, user.admin);
			const message = {
				text:
					"click on this link to reset your password.\n https://cointelegraphbitcoin.com/new-password?token=" +
					token,
				from: "TELEGRAPHBTC <support@cointelegraphbitcoin.com>",
				to: `<${req.body.email}>`,
				subject: "RESET PASSWORD COINTELEGRAPHBTC",
			};
			logs.success("user exists");

			mailer.send(message);
			await Users.updateOne(
				{ email: req.body.email },
				{ resetoken: token },
				{ new: true }
			);
		}

		f.sendResponse(
			res,
			200,
			"an email will be sent to you if it exist in our database"
		);
	} catch (error) {
		logs.error(error);
		e.unprocessedEntity(res);
	}
};

export const newPassword = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		let tk = req.query.token;
		if (tk?.length && verifyToken(tk as string)) {
			const userId: any = jwt.decode(tk as string);
			console.log(userId.id);
			const user = await Users.findById(userId.id);
			if ((user as User).resetoken === tk) {
				// let hashedPassword = hash
				let hash = hashedpassword(req.body.password);
				await Users.updateOne(
					{ _id: userId.id },
					{ password: hash, resetoken: undefined },
					{ new: true }
				);
				f.sendResponse(
					res,
					201,
					"password update sucessfully you can now login"
				);
			} else {
				await Users.updateOne(
					{ _id: userId.id },
					{ resetoken: undefined },
					{ new: true }
				);
				e.clientError(res, "token is expired");
			}
		} else {
			logs.warning("token does not exist");
			e.unprocessedEntity(res);
		}
	} catch (error) {
		e.unprocessedEntity(res);
	}
};
