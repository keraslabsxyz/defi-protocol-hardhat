import { expect } from "chai";
import { selectBestQuote } from "../src/services/quoteService";
import { validateMinAmountOut } from "../src/services/swapService";

describe("mini assessment", function () {
  it("selectBestQuote should choose the highest output amount", function () {
    const result = selectBestQuote([
      { sourceName: "DEX_ONE", sourceAddress: "0x1", amountOut: 101n },
      { sourceName: "DEX_TWO", sourceAddress: "0x2", amountOut: 105n },
    ]);

    expect(result.sourceName).to.equal("DEX_TWO");
    expect(result.amountOut).to.equal(105n);
  });

  it("validateMinAmountOut should throw when expected output is below minAmountOut", function () {
    expect(() => validateMinAmountOut(99n, 100n)).to.throw("Slippage check failed");
  });
});
