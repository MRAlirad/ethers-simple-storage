const { JsonRpcProvider, Wallet, ContractFactory } = require('ethers');
const fs = require('fs');

const main = async () => {
	// connect to the local blockchain url
	const provider = new JsonRpcProvider('http://127.0.0.1:7545');

	// sign a transaction with your private key
	const wallet = new Wallet('0x77cd201d88a6f695434115341ed89761f3fb130dbef7120c5d35f458bbe8d9b3', provider);

	// get abi and binary of the compiled contract
	const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
	const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');

	const contactFactory = new ContractFactory(abi, binary, wallet);

	console.log('Deploying, please wait...');

	// deploy the contract using deploy mehod of contactFactory
	const contract = await contactFactory.deploy();

	console.log(contract);
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
