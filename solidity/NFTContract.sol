// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// // import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// // import "@openzeppelin/contracts/access/Ownable.sol";

// contract MyNFT is ERC721, Ownable {
//     uint256 private _tokenIdCounter;

//     constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

//     function mintNFT() public {
//         // Increment counter first to avoid starting from 0
//         _tokenIdCounter++;
//         // Use the incremented value for minting
//         _safeMint(msg.sender, _tokenIdCounter);
//     }

//     function transferNFT(address to, uint256 tokenId) public {
//         require(to != address(0), "Transfer to zero address");
//         try this.ownerOf(tokenId) returns (address) {
//             require(ownerOf(tokenId) == msg.sender, "Not token owner");
//             safeTransferFrom(msg.sender, to, tokenId);
//         } catch {
//             revert("Token does not exist");
//         }
//     }

//     function getTokenByOwner(
//         address owner
//     ) public view returns (uint256[] memory) {
//         uint256 balance = balanceOf(owner);
//         uint256[] memory tokens = new uint256[](balance);
//         uint256 index = 0;
//         for (uint256 i = 1; i <= _tokenIdCounter; i++) {
//             if (ownerOf(i) == owner) {
//                 tokens[index] = i;
//                 index++;
//             }
//         }
//         return tokens;
//     }

//     function balanceOfNFT(address owner) public view returns (uint256) {
//         require(owner != address(0), "Balance query for zero address");
//         return balanceOf(owner);
//     }
// }
