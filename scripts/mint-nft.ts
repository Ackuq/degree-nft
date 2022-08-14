import dotenv from "dotenv";
import contract from "../artifacts/contracts/DegreeNFT.sol/DegreeNFT.json";
import * as ethers from "ethers";

// Get env vars
dotenv.config();
const { ALCHEMY_API_KEY, PRIVATE_KEY, NETWORK } = process.env;
const provider = new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY);

const contractAddress = "0xFEf8219c055a2E2ACF52D1cFDF0Fd5aEB87EDFAB";

// Create a signer
if (!PRIVATE_KEY) {
  console.error("MetaMask `PRIVATE_KEY` not specified, exiting...");
  process.exit(1);
}

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const abi = contract.abi;
const nftContract = new ethers.Contract(contractAddress, abi, signer);

const mintNFT = async (tokenURI: string) => {
  let nftTxn = await nftContract.safeMint(signer.address, tokenURI);
  await nftTxn.wait();
  console.log(
    `NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`
  );
};

const requestedURI = process.argv[2];
if (!requestedURI) {
  console.error("First argument should be the URI of the NFT resource.");
  process.exit(1);
}

mintNFT(
  "ipfs://bafkreicdcefsnel44ykygfby7nsx7olpiungeec4yabobc75de7bvqt7oi"
).catch((error) => {
  console.error(error);
  process.exit(1);
});
