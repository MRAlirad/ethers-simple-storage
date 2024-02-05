import { ethers } from 'ethers';
import * as fs from 'fs';
import 'dotenv/config';

async function main() {
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
	const encriptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD!);
	fs.writeFileSync('./.encryptedKey.json', encriptedJsonKey);
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
