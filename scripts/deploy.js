const { ethers } = require("hardhat");

async function main() {
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the balance of the deployer account
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    // Deploy the contract
    const TrustVote = await ethers.getContractFactory("TrustVote");
    const trustVote = await TrustVote.deploy();  // Deploys the contract
    await trustVote.deployed();  // Wait until the contract is mined
  
    console.log("TrustVote contract deployed to:", trustVote.address);
  }
  
  // Run the main deployment function
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });