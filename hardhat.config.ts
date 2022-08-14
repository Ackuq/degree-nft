import type { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, NETWORK = "goerli" } = process.env;

const network = ethers.providers.getNetwork(NETWORK);

let config: HardhatUserConfig = {
  solidity: "0.8.9",
};

if (!ALCHEMY_API_KEY || !PRIVATE_KEY) {
  console.log(
    "Either `ALCHEMY_API_KEY` or `PRIVATE_KEY` not set, using test config "
  );
} else {
  console.log(`Using network ${NETWORK}...`);
  config = {
    ...config,
    defaultNetwork: network.name,
    networks: {
      [network.name]: {
        url: ethers.providers.AlchemyProvider.getUrl(network, ALCHEMY_API_KEY)
          .url,
        accounts: [PRIVATE_KEY],
      },
    },
  };
}

export default config;
