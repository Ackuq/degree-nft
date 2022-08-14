import type { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, NETWORK = "goerli" } = process.env;

console.log(`Using network ${NETWORK}...`);

const network = ethers.providers.getNetwork(NETWORK);

if (!ALCHEMY_API_KEY || !PRIVATE_KEY) {
  throw new Error(
    "Both `ALCHEMY_API_KEY` and `PRIVATE_KEY` environment variables needs to be set"
  );
}

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: network.name,
  networks: {
    [network.name]: {
      url: ethers.providers.AlchemyProvider.getUrl(network, ALCHEMY_API_KEY)
        .url,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
