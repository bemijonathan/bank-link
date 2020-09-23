import { Router } from "express";
import { authenticate } from "../../utils/auth";
import { UserController } from "./user.controller";

const userRoute = Router();

userRoute
	.route("/")
	.patch(authenticate, UserController.updateUser)
	.get(authenticate, UserController.getUser);

export default userRoute;
