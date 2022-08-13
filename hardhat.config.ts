import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, NETWORK = "goerli" } = process.env;

console.log(`Using network ${NETWORK}...`);

if (!ALCHEMY_API_KEY || !PRIVATE_KEY) {
  throw new Error(
    "Both `ALCHEMY_API_KEY` and `PRIVATE_KEY` environment variables needs to be set"
  );
}

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: NETWORK,
  networks: {
    [NETWORK]: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
