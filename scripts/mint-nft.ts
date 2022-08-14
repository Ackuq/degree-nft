import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
import dotenv from "dotenv";
import contract from "../artifacts/contracts/DegreeNFT.sol/DegreeNFT.json";

dotenv.config();
const { ALCHEMY_API_KEY, PUBLIC_KEY, PRIVATE_KEY } = process.env;

if (!ALCHEMY_API_KEY) {
  console.error("Environment variable `ALCHEMY_API_KEY` not set, exiting...");
  process.exit(1);
}

const ALCHEMY_URL = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const web3 = createAlchemyWeb3(ALCHEMY_URL);

const contractAddress = "0xFEf8219c055a2E2ACF52D1cFDF0Fd5aEB87EDFAB";

const nftContract = new web3.eth.Contract(
  contract.abi as AbiItem[],
  contractAddress
);

async function mintNFT(tokenURI: string) {
  if (!PUBLIC_KEY || !PRIVATE_KEY) {
    console.error(
      "Environment variable `PUBLIC_KEY` or `PRIVATE_KEY` not set, exiting..."
    );
    process.exit(1);
  }

  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // get latest nonce

  // The transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.safeMint(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      if (!signedTx.rawTransaction) {
        throw new Error(
          "Transaction did not return any transaction data, exiting..."
        );
      }

      web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      });
    })
    .catch((err) => {
      console.error(" Promise failed:", err);
      process.exit(1);
    });
}

const requestedURI = process.argv[2];
if (!requestedURI) {
  console.error("First argument should be the URI of the NFT resource.");
  process.exit(1);
}

mintNFT("ipfs://bafkreicdcefsnel44ykygfby7nsx7olpiungeec4yabobc75de7bvqt7oi");
