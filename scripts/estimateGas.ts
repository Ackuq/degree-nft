import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  // Get contract
  const contractFactory = await ethers.getContractFactory("DegreeNFT");
  const deployTransaction = await contractFactory.getDeployTransaction();
  const provider = ethers.getDefaultProvider();

  const amountEstimation = await provider.estimateGas(deployTransaction);

  console.log(
    "The estimated amount of gas for deployment is:",
    amountEstimation.toString()
  );

  const gasPrice = await provider.getGasPrice();

  console.log(
    `Gas price is at ${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`
  );

  const deployCost = amountEstimation.mul(gasPrice);

  console.log(
    `Deployment cost estimated to ${ethers.utils.formatUnits(
      deployCost,
      "gwei"
    )} Gwei (or ${ethers.utils.formatEther(deployCost)} ETH)`
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
