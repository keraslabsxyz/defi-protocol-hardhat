// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract MockDexBase {
    uint256 public immutable feeBps;
    uint256 public immutable quoteMultiplierBps;

    event Swapped(
        address indexed recipient,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor(uint256 _feeBps, uint256 _quoteMultiplierBps) {
        feeBps = _feeBps;
        quoteMultiplierBps = _quoteMultiplierBps;
    }

    function getQuote(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) public view returns (uint256 amountOut) {
        require(tokenIn != address(0), "tokenIn=0");
        require(tokenOut != address(0), "tokenOut=0");
        require(tokenIn != tokenOut, "same token");
        require(amountIn > 0, "amountIn=0");

        uint256 gross = amountIn * quoteMultiplierBps / 10_000;
        amountOut = gross * (10_000 - feeBps) / 10_000;
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        address recipient
    ) external returns (uint256 amountOut) {
        amountOut = getQuote(tokenIn, tokenOut, amountIn);
        require(amountOut >= minAmountOut, "slippage");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(recipient, amountOut);

        emit Swapped(recipient, tokenIn, tokenOut, amountIn, amountOut);
    }
}
