import { getDexContract } from "../clients/blockchain";
import { config } from "../config";
import { QuoteResult } from "../types";

const SOURCES = [
  { name: "DEX_ONE", address: config.dexOneAddress },
  { name: "DEX_TWO", address: config.dexTwoAddress },
];

export function selectBestQuote(quotes: QuoteResult[]): QuoteResult {
  if (quotes.length === 0) {
    throw new Error("No quotes available");
  }

  // Intentional bug for the assessment:
  // this chooses the lowest quote instead of the highest.
  return quotes.reduce((best, current) =>
    current.amountOut < best.amountOut ? current : best,
  );
}

export async function getBestQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: bigint,
): Promise<QuoteResult> {
  const quotes = await Promise.all(
    SOURCES.map(async (source) => {
      const dex = getDexContract(source.address);
      const amountOut = await dex.getQuote(tokenIn, tokenOut, amountIn);
      return {
        sourceName: source.name,
        sourceAddress: source.address,
        amountOut: BigInt(amountOut.toString()),
      } satisfies QuoteResult;
    }),
  );

  return selectBestQuote(quotes);
}
