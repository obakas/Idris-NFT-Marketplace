// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {IdrisNftMarketplace} from "../src/IdrisNftMarketplace.sol";

contract DeployIdrisNftMarketplace is Script {
    function deployMarketplace(address paymentToken) public returns (IdrisNftMarketplace) {
        vm.startBroadcast();
        IdrisNftMarketplace marketplace = new IdrisNftMarketplace(paymentToken);
        vm.stopBroadcast();
        return marketplace;
    }

    // function run() external returns (address) {
    //     NftMarketplace marketplace = deployMarketplace();
    //     return address(marketplace);
    // }
}