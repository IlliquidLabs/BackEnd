require("@nomiclabs/hardhat-waffle");
const dotenv = require('dotenv-flow').config();
const HqDWalletProvider = require("@truffle/hdwallet-provider");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
  arbitrum: {
    url: "https://arb1.arbitrum.io/rpc",
    accounts: [process.env.DEPLOYER_PK],
    chainId: 42161
  },
  rinkeby: {
    url: process.env.INFURARINKEBY,
    accounts: [process.env.DEPLOYER_PK],
    chainId: 4
  }
  },
  solidity: {
    compilers: [
      {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
       },
      }
    },
    {
      version: "0.6.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
       },
      }
    },
    ],
    }
  }
