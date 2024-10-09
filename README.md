# Ethers Simple Storage

## Install NPM

```bash
npm init -y
```

## Compiling Solidity

in order to compile our silidity file we need to install a package called [`solc-js`](https://github.com/ethereum/solc-js).

since we are working with version 0.8.7 of solidity it's better to install the version 0.8.7 of solc.

we use ``--fixed`` because the 0.8.7 has some bugs.

```bash
npm install solc@0.8.7-fixed
```

To see all the supported features, execute:

```bash
solcjs --help
```

To compile a contract that imports other contracts via relative paths:

```bash
npx solcjs --bin --abi --include-path node_modules/ --base-path . -o . SolidityFileName.sol
```

1. we use `--bin` => because we want the binary
2. we use `--api` => because we want the ABI

we can alse add the above command to our package.json script and call it `compile`. and use the below command

```bash
npm run compile
```

## Ganache & Networks

to deploy our contract we can use a tool called [`Ganache`](https://archive.trufflesuite.com/ganache), which is our fake blockchain. (almost like JavaScript VM in Remix).

If we go to the network tab of metamask (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#settings/networks), every network has sth called `RPC URL` (Remote Procedure Call Uniform Resource Locator).
which is a connection to a blockchain node that somebody is running.
Sepolia RPC URL : "https://sepolia.infura.io/v3/"

This url connect us to make API calls and to intract with a blockchain node.
Ganache also has a RPC URL which is : `http://127.0.0.1:7545`

If you go to [`go-ethereum`](https://github.com/ethereum/go-ethereum) github repo, there are some structures for you to run your own blockchain node.

if you go to `JSON RPC Spec Playground` there are some methods you can use to interface Ethereum clients

to intract with our node and do things like deploy and intract with our block chain node we use `Ether.js`

## Ethers.js

The [`ethers.js library`]((https://docs.ethers.org/v6/)) aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.

It is often used to create decentralized applications (dapps), wallets (such as MetaMask and Tally) and other tools and simple scripts that require reading and writing to the blockchain.

it is also like [`Web3.js`](https://web3js.readthedocs.io/en/v1.10.0/)

you can install it using the command:

```bash
npm install ethers
```

and import it using:

```js
const ethers = require('ethers')
```

### JsonRpcProvider

The [`JsonRpcProvider`](https://docs.ethers.org/v6/api/providers/jsonrpc/#JsonRpcProvider) is one of the most common Providers, which performs all operations over HTTP (or HTTPS) requests.

with `JsonRpcProvider` you can connect to the local blockchain url that is passedd to it.

```js
    const { JsonRpcProvider } = require('ethers');
    const provider = new JsonRpcProvider('http://127.0.0.1:7545');
```

### Wallet

The [`Wallet`](https://docs.ethers.org/v5/api/signer/#Wallet) class inherits Signer and can sign transactions and messages using a private key as a standard Externally Owned Account (EOA).

```js
const { Wallet } = require('ethers');
const wallet = new Wallet('0x4692ffff0ab01bebf0263df43f965047379a76ca4ee486df915bbf2ac8ac9745', provider);
```

### ABI and Binary

in order to deploy our contract we need the `ABI` and `Binary` compiled code of the contract. we can use a package called [`fs`](https://www.npmjs.com/package/fs-extra) to do so.

```bash
npm install fs-extra
```

```js
const fs = require('fs');
const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');
```

### ContractFactory

A [`ContractFactory`](https://docs.ethers.org/v6/api/contract/#ContractFactory) is used to deploy a Contract to the blockchain. takes `abi`, `binary`, `wallet`.

```js
const { ContractFactory } = require('ethers');
const contactFactory = new ContractFactory(abi, binary, wallet);
```

### Deploy

the [`deploy method`](https://docs.ethers.org/v6/api/contract/#ContractFactory-deploy) of ContractFactory resolves to the Contract deployed by passing args into the constructor.

```js
const contract = await contactFactory.deploy();
```

## Adding Transaction Overrides

we can give our deploy method some config to send some extra values like:  `gasPrice`, `gasLimit`, ...

```js
const contract = await contactFactory.deploy({
    gasPrice: 100000000000,
    gasLimit: 173460347334347,
});
```

## Transaction Receipts

the [`deploymentTransaction()`](https://docs.ethers.org/v6/api/contract/#BaseContract-deploymentTransaction) Return the transaction used to deploy this contract.

we can also wait for the certain number of blocks for our contract finish with so we've deployed the but we want to wait one block to make sure it acctually gets attached to the chain.

```js
const deploymentReceipt = await contract.deploymentTransaction().wait(1);
```

you can also deploy the contract with only the transaction data using two methods of wallet class:

1. `wallet.signTransaction` => to sign a transaction
2. `wallet.sendTransaction` => to send the tranaction and also sign it

you can also provide the txData details to pass to these methods

```js
const txData = {
    accessList: [],
    chainId: 123456,
    confirmations: 0,
    data: '0x', // binary of the contract we want to deploy. starts with 0x
    from: '0x46E0726Ef145d92DEA66D38797CF51901701926e',
    gasLimit: { BigNumber: "21000" },
    gasPrice: null,
    hash: '0x1c4913f6e06a8b48443dbe3169acb6701b558ed6d3b478723eb6b137d2418792',
    maxFeePerGas: { BigNumber: "1500000014" },
    maxPriorityFeePerGas: { BigNumber: "1500000000" },
    nonce : await wallet.getNonce(), //! always get the correct nounce
    r: '0xb58e9234bf734f5bab14634ca21e35c3fa163562930d782424e78120cfcc9b8f',
    s: '0x690c4b1c3d2b6e519340b2f0f3fc80ccea47e3c2a077f9771aaa2e1d7552aa24',
    to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    type: 2,
    v: 0,
    value: { BigNumber: "1000000000000000000" },
    wait: [Function (anonymous)]
}

const sentTxResponse = await wallet.sendTransaction(txData);
```

## Interacting with Contracts in Ethers.js

when you deploy the contract, it returns the object of the contract and you can have access to the methods and proprty of it.

all the methods and properties of the contract are promises and you need to await it.

```js
const contract = await contactFactory.deploy();

//? get the favouriteNumber;
const currentFavouriteNumber = await contract.retrieve();
console.log(`current favourite number: ${currentFavouriteNumber.toString()}`);

//? change the favourite number
const transacitonResponse = await contract.store('125');
const transacitonReceipt = await transacitonResponse.wait(1);

const updatedFavouriteNumber = await contract.retrieve();
console.log(`updated favourite number is: ${updatedFavouriteNumber}`);
```

you better work with the `string type of the numbers`, so you can handle [`bigNumber`](https://docs.ethers.org/v5/api/utils/bignumber/).

[Online Solidity Decompiler](https://ethervm.io/decompile)

## Environment Variables

It's not ok to expose your crucial information like private key or ... in your code.
You better put them in your `.env` file and read your data from there.

to work with our `.env` file we need to install a package called [`dotenv`](https://www.npmjs.com/package/dotenv);

```bash
npm install dotenv
```

to use it:

```js
    require('dotenv').config();

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
```

`PRIVATE_KEY` is in your .env file

[`THE .ENV PLEDGE`](https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5)

## Better Private Key Management

this is `encryptKey.js`
```js
const wallet = new Wallet(process.env.PRIVATE_KEY);
const encriptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD);
fs.writeFileSync('./.encryptedKey.json', encriptedJsonKey);
```

this is deploy.js
```js
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const encriptedJson = fs.readFileSync('./.encryptedKey.json', 'utf-8');
let wallet = new Wallet.fromEncryptedJsonSync(
    encriptedJson,
    process.env.PRIVATE_KEY_PASSWORD
);
wallet = wallet.connect(provider);
```

1. [`wallet.encrypt`](https://docs.ethers.org/v6/api/wallet/#Wallet-encrypt)
2. [`wallet.fromEncryptedJsonSync`](https://docs.ethers.org/v6/api/wallet/#Wallet_fromEncryptedJsonSync)

## Deploying to a Testnet or a Mainnet

to deploy our contract on Testnet or a Mainnet we can use `Alchemy`.

[`Alchemy`](https://www.alchemy.com/) is a web3 develpment platform. a node as a service and allows us to connect to any blockchain that they have supporte for.


You can take the `RPC_URL` from Alchemy and the `PRIVATE_KEY` from metamask