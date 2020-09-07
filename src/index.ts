import chalk from "chalk";
import app from "./server";

const port: number | string = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(chalk.red("server is listening on port", port));
});
