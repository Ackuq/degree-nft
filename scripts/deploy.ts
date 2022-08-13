import { ethers } from "hardhat";

const main = async () => {
  // Get contract
  const SingleNFT = await ethers.getContractFactory("SingleNFT");

  // Start deployment
  const singleNFT = await SingleNFT.deploy();
  // Wait until deployment is complete
  await singleNFT.deployed();
  console.log("Contract deployed to address:", singleNFT.address);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
