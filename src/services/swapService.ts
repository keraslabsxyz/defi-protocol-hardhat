import { getRouterContract, getTokenContract } from "../clients/blockchain";
import { SwapRequest } from "../types";
import { getBestQuote } from "./quoteService";

export function validateMinAmountOut(expectedAmountOut: bigint, minAmountOut: bigint) {
  // Intentional assessment gap:
  // this should reject when expectedAmountOut is below minAmountOut,
  // but it currently does nothing.
  return true;
}

export async function executeSwap(request: SwapRequest) {
  const amountIn = BigInt(request.amountIn);
  const minAmountOut = BigInt(request.minAmountOut);

  const bestQuote = await getBestQuote(request.tokenIn, request.tokenOut, amountIn);
  validateMinAmountOut(bestQuote.amountOut, minAmountOut);

  const tokenIn = getTokenContract(request.tokenIn);
  const router = getRouterContract();

  const approveTx = await tokenIn.approve(await router.getAddress(), amountIn);
  await approveTx.wait();

  const swapTx = await router.executeSwap(
    bestQuote.sourceAddress,
    request.tokenIn,
    request.tokenOut,
    amountIn,
    minAmountOut,
    request.recipient,
  );

  return {
    txHash: swapTx.hash,
    selectedSource: bestQuote.sourceName,
    expectedAmountOut: bestQuote.amountOut.toString(),
    status: "submitted",
  };
}
