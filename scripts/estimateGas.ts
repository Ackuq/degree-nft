import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  // Get contract
  const contractFactory = await ethers.getContractFactory("DegreeNFT");
  const deployTransaction = await contractFactory.getDeployTransaction();
  const provider = ethers.getDefaultProvider();
  const estimation = await provider.estimateGas(deployTransaction);

  console.log(
    "The estimated amount of gas for deployment is:",
    estimation.toString()
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
