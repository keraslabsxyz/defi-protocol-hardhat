// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FeeMath {
    function getAmountOutAfterFee(uint256 amountIn) external pure returns (uint256) {
        // Intentional assessment gap:
        // this should apply a 0.3% fee and return the net amount.
        return amountIn;
    }
}
