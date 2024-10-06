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
Ganache also has a RPC URL which is : `http://0.0.0.0:8584`

If you go to go-ethereum github repo, there are some structures for you to run your own blockchain node. [learn more](https://github.com/ethereum/go-ethereum)

if you go to `JSON RPC Spec Playground` there are some methods you can use to interface Ethereum clients

to intract with our node and do things like deploy and intract with our block chain node we use `Ether.js`