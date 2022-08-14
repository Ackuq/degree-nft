import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";
import { ethers } from "hardhat";
dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, NETWORK = "goerli" } = process.env;

console.log(`Using network ${NETWORK}...`);

const provider = new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY);

if (!ALCHEMY_API_KEY || !PRIVATE_KEY) {
  throw new Error(
    "Both `ALCHEMY_API_KEY` and `PRIVATE_KEY` environment variables needs to be set"
  );
}

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: provider.network.name,
  networks: {
    [provider.network.name]: {
      ...provider.network,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
