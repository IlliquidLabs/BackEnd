// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the account used to deploy
  const [deployer] = await ethers.getSigners();
  console.log("Account balance:", (await deployer.getBalance()).toString())

//set wethAddress for Honey Router
  let wethAddress
  let chainId = await deployer.getChainId()
  if (chainId == 4) {
    wethAddress = '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'
  }
  else if (chainId == 42161) {
    wethAddress = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
  }
  console.log("WETH Address:", wethAddress)
  
// We get the contract to deploy
  const Factory = await hre.ethers.getContractFactory("HoneyFactory");
  const factory = await Factory.deploy(deployer.address);

  await factory.deployed();

  console.log("Honey Factory deployed to:", factory.address);

  const Router = await hre.ethers.getContractFactory("HoneyRouter");
  const router = await Router.deploy(factory.address, wethAddress);

  await router.deployed();

  console.log("Honey Router deployed to:", router.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
