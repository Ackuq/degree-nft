import dotenv from "dotenv";
import contract from "../artifacts/contracts/DegreeNFT.sol/DegreeNFT.json";
import * as ethers from "ethers";
import readline from "readline";

// Get env vars
dotenv.config();
const {
  ALCHEMY_API_KEY,
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
  NETWORK = "goerli",
} = process.env;
const provider = new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY);

// Create a signer
if (!PRIVATE_KEY) {
  console.error("`PRIVATE_KEY` not specified, exiting...");
  process.exit(1);
} else if (!ALCHEMY_API_KEY) {
  console.error("`ALCHEMY_API_KEY` not specified, exiting...");
  process.exit(1);
} else if (!CONTRACT_ADDRESS) {
  console.error("`CONTRACT_ADDRESS` not specified, exiting...");
  process.exit(1);
}

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const abi = contract.abi;
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const mintNFT = async (tokenURI: string) => {
  // Mint the new NFT
  let nftTxn = await nftContract.safeMint(signer.address, tokenURI);
  await nftTxn.wait();
  const link =
    (NETWORK === "mainnet"
      ? "https://etherscan.io/tx/"
      : `https://${NETWORK}.etherscan.io/tx/`) + nftTxn.hash;
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
        mintNFT(tokenURI).catch((error) => {
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
