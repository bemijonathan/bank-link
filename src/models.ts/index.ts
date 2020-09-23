import mongoose from "mongoose";

export const connect = async () => {
	await mongoose.connect("mongodb://localhost:27017/myapp?retryWrites=false", {
		useNewUrlParser: true,
	});
};

//sudo npm install run-rs -g
//run-rs -v 4.0.0 --shell
