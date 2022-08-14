# Simple NFT contract for degrees

This is a simple NFT contract for academic degrees, made for fun and not to be taken to seriously. The minted NFTs are not for sale and does not provide any specific rights.

## Set up

### Installing dependencies

Dependency management is done using [Yarn](https://yarnpkg.com/). To install the dependencies, simply run:

```sh
yarn install
```

### Environment variables

To deploy your own NFT contract using this setup, copy the `.env` template:

```sh
cp .env.example .env
```

Fill in the different variables with their desired values, a summary of these variables is found below.

| Key                | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `NETWORK`          | The ethereum network to interact with, e.g. `goerli` or `mainnet`             |
| `ALCHEMY_API_KEY`  | The API key to the Alchemy project                                            |
| `PRIVATE_KEY`      | Private key to the owners wallet, for minting new NFTs and deploying contract |
| `CONTRACT_ADDRESS` | The address of the deployed contract, for minting new NFTs                    |

## Scripts

The following scripts are provided in this project.

### Compile

All the scripts require you to first compile the contract, to do this, run the following command:

```sh
yarn compile
```

### Deploy

This script deploys a new contract to the network specified with the `NETWORK` environment variable. The wallet specified using the `PRIVATE_KEY` will be the creator of the contract. Usage:

```sh
yarn deploy
```

### Minting new NFTs

To mint a new NFT, be sure to have set environment variable `CONTRACT_ADDRESS` as the address of the deployed contract. Then run:

```sh
yarn mint
```

You will be prompted to input a IPFS address to a remote metadata object. If you haven't done it already, create a metadata object, and upload it to IPFS, using for example [nft.storage](https://nft.storage/). A template of a metadata object can be seen in `metadata/example.json`. The `image` field should point to an image of the degree you want to mint.
