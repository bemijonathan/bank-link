import chalk from "chalk";
import app from "./src/server";

app.listen(80, () => {
	console.log(chalk.bgRedBright("server is listening on port 80"));
});
