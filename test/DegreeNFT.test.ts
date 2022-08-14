import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

import { contracts } from "../typechain-types";

describe("DegreeNFT", () => {
  let degreeNFT: contracts.DegreeNFT,
    owner: SignerWithAddress,
    signers: SignerWithAddress[];

  beforeEach(async () => {
    [owner, ...signers] = await ethers.getSigners();
    const DegreeNFTFactory = await ethers.getContractFactory("DegreeNFT");
    degreeNFT = await DegreeNFTFactory.deploy();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      const expected = owner.address;
      const real = await degreeNFT.owner();
      expect(real).to.equal(expected);
    });
  });

  describe("safeMint", () => {
    const tokenURI = "ipfs://test/uri";

    describe("non-owners", () => {
      it("Should not be able to mint", async () => {
        const caller = signers[0];
        const receiver = caller.address;

        await expect(
          degreeNFT.connect(caller).safeMint(receiver, tokenURI)
        ).to.be.revertedWith("Ownable: caller is not the owner");

        // Make sure token is not created
        await expect(degreeNFT.tokenURI(0)).to.be.revertedWith(
          "ERC721: invalid token ID"
        );
      });
    });

    describe("owner", () => {
      it("Should be able to send mint for self", async () => {
        const receiver = owner.address;

        await degreeNFT.connect(owner).safeMint(receiver, tokenURI);

        expect(await degreeNFT.tokenURI(0)).to.equal(tokenURI);
        expect(await degreeNFT.ownerOf(0)).to.equal(receiver);
      });

      it("Should be able to send for others", async () => {
        const receiver = signers[0].address;

        await degreeNFT.connect(owner).safeMint(receiver, tokenURI);

        expect(await degreeNFT.tokenURI(0)).to.equal(tokenURI);
        expect(await degreeNFT.ownerOf(0)).to.equal(receiver);
      });
    });
  });
});
