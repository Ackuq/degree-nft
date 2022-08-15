import dotenv from "dotenv";
import { ethers, network } from "hardhat";
import readline from "readline";

// Get env vars
dotenv.config();
const { CONTRACT_ADDRESS } = process.env;

if (!CONTRACT_ADDRESS) {
  console.error("`CONTRACT_ADDRESS` not specified, exiting...");
  process.exit(1);
}
const mint = async (tokenURI: string) => {
  const signer = (await ethers.getSigners())[0];

  const contract = await ethers.getContractAt(
    "DegreeNFT",
    CONTRACT_ADDRESS,
    signer
  );

  const nftTxn = await contract.safeMint(signer.address, tokenURI);
  await nftTxn.wait();

  const link =
    (network.name === "mainnet"
      ? "https://etherscan.io/tx/"
      : `https://${network.name}.etherscan.io/tx/`) + nftTxn.hash;
  console.log(`NFT Minted! Check it out at: ${link}`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("IPFS URI for metadata: ", (tokenURI: string) => {
  // Make sure the token URI is valid
  if (!tokenURI.startsWith("ipfs://")) {
    console.error("Invalid IPFS URI specified, must start with `ipfs://`");
    rl.close();
    process.exit(1);
  }
  const httpsURI =
    tokenURI.replace("ipfs://", "https://") + ".ipfs.ipfs-gateway.cloud";
  // Layer of security to be able to double check the metadata
  rl.question(
    `Do you want to mint using metadata found at ${httpsURI}, yes or no? `,
    (answer) => {
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        mint(tokenURI).catch((error) => {
          console.error(error);
          process.exit(1);
        });
      } else {
        console.log("Exiting program without minting...");
      }
      rl.close();
    }
  );
});

rl.on("close", () => {
  process.exit(0);
});
