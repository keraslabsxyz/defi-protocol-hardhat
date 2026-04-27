export type QuoteResult = {
  sourceName: string;
  sourceAddress: string;
  amountOut: bigint;
};

export type SwapRequest = {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  minAmountOut: string;
  recipient: string;
};
