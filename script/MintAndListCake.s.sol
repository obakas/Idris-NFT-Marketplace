// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {CakeNft} from "../src/CakeNft.sol";
import {IdrisNftMarketplace} from "../src/IdrisNftMarketplace.sol";

contract MintAndListCake is Script {
    // Fill these in if needed!
    address s_cakeAddress;
    address s_marketplaceAddress;

    function mintAndListCake(address cakeAddress, address marketplaceAddress) public {
        CakeNft cake = CakeNft(cakeAddress);
        IdrisNftMarketplace marketplace = IdrisNftMarketplace(marketplaceAddress);

        vm.startBroadcast();

        uint256 tokenId = cake.bakeCake();
        console.log(tokenId);
        cake.approve(marketplaceAddress, tokenId);
        marketplace.listItem(cakeAddress, tokenId, 10e6);

        vm.stopBroadcast();
    }

    function justMintCake(address cakeAddress) public {
        CakeNft cake = CakeNft(cakeAddress);

        vm.startBroadcast();

        cake.bakeCake();

        vm.stopBroadcast();
    }

    function run() external {
        mintAndListCake(s_cakeAddress, s_marketplaceAddress);
    }
}