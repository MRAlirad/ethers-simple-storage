const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
    apiKey: "Mht0gnZiAUp44Uni8KaZ9gWmO55SgEx-",
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);