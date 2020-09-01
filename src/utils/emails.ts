import { SMTPClient } from "emailjs";

// const message = {
//     text: 'i hope this works',
//     from: 'support@cointelegraphbitcoin.com>',
//     to: 'alexanderporterr@gmail.com',
//     subject: 'testing emailjs',
// }

class sendMailCode {
	constructor() {
		this.client = new SMTPClient({
			user: "cointelegraphbitcoin@gmail.com",
			password: "nxsaofygsvolvvwi",
			host: "smtp.gmail.com",
			ssl: true,
		});
	}
	client: any;

	send(message: any) {
		this.client.send(message, function (err: any, message: any) {
			console.log(err || message);
		});
	}
}

export const mailer = new sendMailCode();
