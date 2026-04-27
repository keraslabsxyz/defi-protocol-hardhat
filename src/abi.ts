export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

export const DEX_ABI = [
  "function getQuote(address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256)",
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address recipient) external returns (uint256)"
];

export const ROUTER_ABI = [
  "function executeSwap(address source, address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address recipient) external returns (uint256)"
];
