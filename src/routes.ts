import transactionRoute from "./resources /transactions/transaction.route";
import { Express } from "express";
import { signUp, signIn, resetPassword, newPassword } from "./utils/authRoutes";

export const Routes = (app: Express) => {
	/**
	 * @swagger
	 * components:
	 *  schemas:
	 *    SignupResponse:
	 *      properties:
	 *        status:
	 *          type: boolean
	 *        data:
	 *          type: object
	 */

	/**
	 * @swagger
	 * components:
	 *  schemas:
	 *    SignIn:
	 *      properties:
	 *        email:
	 *          type: string
	 *        password:
	 *          type: string
	 */
	/**
	 * @swagger
	 * /signin:
	 *   post:
	 *     tags:
	 *       - Users
	 *     description: Create a new user account
	 *     produces:
	 *       - application/json
	 *     security:
	 *       - bearerAuth:[]
	 *     requestBody:
	 *      description: User data object
	 *      required: true
	 *      content:
	 *       application/json:
	 *          schema:
	 *            type: object
	 *            properties:
	 *                username:
	 *                  type: string
	 *                  example: jonathan1234
	 *                email:
	 *                  type: string
	 *                  example: Arthur@Dent.com
	 *     responses:
	 *       200:
	 *         description: User created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/SignupResponse'
	 *       500:
	 *         description: Internal Server error
	 */
	app.post("/signup", signUp);

	app.post("/signin", signIn);
	app.post("/reset-password", resetPassword);
	app.post("/new-password", newPassword);
	app.use("/transaction", transactionRoute);
};
