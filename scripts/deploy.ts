import { ethers } from "hardhat";

const main = async () => {
  // Get contract
  const DegreeNFT = await ethers.getContractFactory("DegreeNFT");

  // Start deployment
  const degreeNFT = await DegreeNFT.deploy();
  // Wait until deployment is complete
  await degreeNFT.deployed();
  console.log("Contract deployed to address:", degreeNFT.address);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
