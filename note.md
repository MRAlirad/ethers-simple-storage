# Ethers Simple Storage

## Install NPM

```bash
npm init -y
```

## Compiling Solidity

in order to compile our silidity file we need to install a package called ``solc-js``. [learn more](https://github.com/ethereum/solc-js)

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

to deploy our contract we can use a tool called `Ganache`, which is our fake blockchain. (almost like JavaScript VM in Remix). [learn more](https://archive.trufflesuite.com/ganache/).

If we go to the network tab of metamask (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#settings/networks), every network has sth called `RPC URL` (Remote Procedure Call Uniform Resource Locator).
which is a connection to a blockchain node that somebody is running.
Sepolia RPC URL : "https://sepolia.infura.io/v3/"

This url connect us to make API calls and to intract with a blockchain node.
Ganache also has a RPC URL which is : `http://127.0.0.1:7545`

If you go to go-ethereum github repo, there are some structures for you to run your own blockchain node. [learn more](https://github.com/ethereum/go-ethereum)

if you go to `JSON RPC Spec Playground` there are some methods you can use to interface Ethereum clients

to intract with our node and do things like deploy and intract with our block chain node we use `Ether.js`

## Ethers.js

The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. [learn more](https://docs.ethers.org/v6/)

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

with `JsonRpcProvider` you can connect to the local blockchain url that is passedd to it

```js
    const { JsonRpcProvider } = require('ethers');
    const provider = new JsonRpcProvider('http://127.0.0.1:7545');
```

### Wallet

with `Wallet` you can sign a transaction with the private key you pass to it.

```js
const { Wallet } = require('ethers');
const wallet = new Wallet('0x4692ffff0ab01bebf0263df43f965047379a76ca4ee486df915bbf2ac8ac9745', provider);
```

### ABI and Binary

in order to deploy our contract we need the `ABI` and `Binary` compiled code of the contract. we can use a package called `fs` to do so. [learn more](https://www.npmjs.com/package/fs-extra)

```bash
npm install fs-extra
```

```js
const fs = require('fs');
const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');
```

### ContractFactory

it is just an object that you can use to deploy contract. takes `abi`, `binary`, `wallet`;

```js
const { ContractFactory } = require('ethers');
const contactFactory = new ContractFactory(abi, binary, wallet);
```

### Deploy

```js
const contract = await contactFactory.deploy();
```