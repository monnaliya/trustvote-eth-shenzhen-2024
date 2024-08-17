require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// Import your environment variables (for the private key and Infura project ID)
require('dotenv').config();

// const { INFURA_PROJECT_ID, PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.18",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // sepolia: {
    //   url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    // Add more networks here if needed
  },
};

module.exports = config;