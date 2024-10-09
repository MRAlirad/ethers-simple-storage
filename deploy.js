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

	const transactionReceipt = await contract.deploymentTransaction().wait(1);

	// console.log(`let's deploy with only transaction data!`);

	// const tx = {
	// 	nonce: await wallet.getNonce(), //! always get the correct nounce
	// 	gapPrice: '20000000000', //! for Ganache is 20000000000 (you can find it in the header of the app tool)
	// 	gasLimit: 1000000,
	// 	to: null,
	// 	value: 0,
	// 	data: '0x60806040526000805534801561001457600080fd5b506107a3806100246000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e64cec1146100675780634f2be91f146100855780636057361d146100a35780636f760f41146100bf5780639e7a13ad146100db578063b2ac62ef1461010c575b600080fd5b61006f61013c565b60405161007c919061055c565b60405180910390f35b61008d610145565b60405161009a919061055c565b60405180910390f35b6100bd60048036038101906100b8919061049f565b61014e565b005b6100d960048036038101906100d49190610443565b610158565b005b6100f560048036038101906100f0919061049f565b6101e8565b604051610103929190610577565b60405180910390f35b610126600480360381019061012191906103fa565b6102a4565b604051610133919061055c565b60405180910390f35b60008054905090565b60006002905090565b8060008190555050565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101be9291906102d2565b505050806001836040516101d29190610545565b9081526020016040518091039020819055505050565b600281815481106101f857600080fd5b906000526020600020906002020160009150905080600001549080600101805461022190610670565b80601f016020809104026020016040519081016040528092919081815260200182805461024d90610670565b801561029a5780601f1061026f5761010080835404028352916020019161029a565b820191906000526020600020905b81548152906001019060200180831161027d57829003601f168201915b5050505050905082565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546102de90610670565b90600052602060002090601f0160209004810192826103005760008555610347565b82601f1061031957805160ff1916838001178555610347565b82800160010185558215610347579182015b8281111561034657825182559160200191906001019061032b565b5b5090506103549190610358565b5090565b5b80821115610371576000816000905550600101610359565b5090565b6000610388610383846105cc565b6105a7565b9050828152602081018484840111156103a4576103a3610736565b5b6103af84828561062e565b509392505050565b600082601f8301126103cc576103cb610731565b5b81356103dc848260208601610375565b91505092915050565b6000813590506103f481610756565b92915050565b6000602082840312156104105761040f610740565b5b600082013567ffffffffffffffff81111561042e5761042d61073b565b5b61043a848285016103b7565b91505092915050565b6000806040838503121561045a57610459610740565b5b600083013567ffffffffffffffff8111156104785761047761073b565b5b610484858286016103b7565b9250506020610495858286016103e5565b9150509250929050565b6000602082840312156104b5576104b4610740565b5b60006104c3848285016103e5565b91505092915050565b60006104d7826105fd565b6104e18185610608565b93506104f181856020860161063d565b6104fa81610745565b840191505092915050565b6000610510826105fd565b61051a8185610619565b935061052a81856020860161063d565b80840191505092915050565b61053f81610624565b82525050565b60006105518284610505565b915081905092915050565b60006020820190506105716000830184610536565b92915050565b600060408201905061058c6000830185610536565b818103602083015261059e81846104cc565b90509392505050565b60006105b16105c2565b90506105bd82826106a2565b919050565b6000604051905090565b600067ffffffffffffffff8211156105e7576105e6610702565b5b6105f082610745565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561065b578082015181840152602081019050610640565b8381111561066a576000848401525b50505050565b6000600282049050600182168061068857607f821691505b6020821081141561069c5761069b6106d3565b5b50919050565b6106ab82610745565b810181811067ffffffffffffffff821117156106ca576106c9610702565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61075f81610624565b811461076a57600080fd5b5056fea2646970667358221220fdfa21c1303d2eb1fad1049727aa34cc68ab55a337d6fc22c1be4fd21f0e07cc64736f6c63430008070033',
	// 	chainId: 1337, //! for Ganache is 1337
	// };

	//? sign the transaction
	// const signedTxResponse = await wallet.signTransaction(tx);

	//? send transaction
	// const sentTxResponse = await wallet.sendTransaction(tx); //? send transaction also sign it so you don't need to sign it yourself

	// console.log(sentTxResponse);

	//? get the favouriteNumber;
	const currentFavouriteNumber = await contract.retrieve();
	console.log(`current favourite number: ${currentFavouriteNumber.toString()}`);

	//? change the favourite number
	const transacitonResponse = await contract.store('125');
	const transacitonReceipt = await transacitonResponse.wait(1);

	const updatedFavouriteNumber = await contract.retrieve();
	console.log(`updated favourite number is: ${updatedFavouriteNumber}`);
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
