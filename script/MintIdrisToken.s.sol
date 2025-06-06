// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {IdrisToken} from "../src/IdrisToken.sol";

contract MintUSDC is Script {
    address ANVIL_USDC = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    address ANVIL_ONE = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() public {
        IdrisToken usdc = IdrisToken(ANVIL_USDC);

        vm.startBroadcast();
        usdc.mint(ANVIL_ONE, 100e6);
        vm.stopBroadcast();
    }
}