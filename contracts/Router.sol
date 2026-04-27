// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMockDex {
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        address recipient
    ) external returns (uint256 amountOut);
}

contract Router {
    event TradeExecuted(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        address source
    );

    function executeSwap(
        address source,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        address recipient
    ) external returns (uint256 amountOut) {
        require(source != address(0), "source=0");
        require(recipient != address(0), "recipient=0");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(source, amountIn);

        amountOut = IMockDex(source).swap(
            tokenIn,
            tokenOut,
            amountIn,
            minAmountOut,
            recipient
        );

        emit TradeExecuted(msg.sender, tokenIn, tokenOut, amountIn, amountOut, source);
    }
}
