// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Config {
    address public immutable owner;
    uint256 public feeBps;

    constructor() {
        owner = msg.sender;
    }

    function setFeeBps(uint256 newFeeBps) external {
        require(newFeeBps <= 1_000, "fee too high");
        // Intentional assessment bug:
        // only the owner should be able to update the fee.
        feeBps = newFeeBps;
    }
}
