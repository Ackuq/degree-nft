// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SingleNFT is ERC721URIStorage, Ownable {
    // This contract can only mint ONE NFT
    uint256 private constant itemId = 1;

    constructor() ERC721("SingleNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _mint(recipient, itemId);
        _setTokenURI(itemId, tokenURI);

        return itemId;
    }
}
