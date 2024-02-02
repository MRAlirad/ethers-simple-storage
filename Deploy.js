const ethers = require('ethers');
const fs = require('fs');

async function main() {
	const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
	const wallet = new ethers.Wallet(
		'0xee8c0e71136cde4ddf3e0ff7d1bb62a90f33282845bd610472ac14722c9d64cc',
		provider
	);
	const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
	const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');
	const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
	console.log('Deploying, please wait...');

	// deploy the contract
	const contract = await contractFactory.deploy();

	// deploy transaction will be waiting to be mined (but not yet included in a block)
	const transactionReceipt = await contract.deploymentTransaction().wait(1);
	console.log('here is the dployment transaction (transaciton response): ');
	console.log(contract.deploymentTransaction);
	console.log('here is the transaction receipt');
	console.log(transactionReceipt); // the receipt of transaction
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
