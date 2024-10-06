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