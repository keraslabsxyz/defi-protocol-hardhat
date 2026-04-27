import express from "express";
import { config } from "./config";
import { getBestQuote } from "./services/quoteService";
import { executeSwap } from "./services/swapService";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/quote", async (req, res) => {
  try {
    const tokenIn = String(req.query.tokenIn || "");
    const tokenOut = String(req.query.tokenOut || "");
    const amountIn = BigInt(String(req.query.amountIn || "0"));

    if (!tokenIn || !tokenOut || amountIn <= 0n) {
      return res.status(400).json({ error: "Invalid quote parameters" });
    }

    const bestQuote = await getBestQuote(tokenIn, tokenOut, amountIn);

    return res.json({
      tokenIn,
      tokenOut,
      amountIn: amountIn.toString(),
      bestSource: bestQuote.sourceName,
      amountOut: bestQuote.amountOut.toString(),
      route: [
        {
          source: bestQuote.sourceName,
          tokenIn,
          tokenOut,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/swap", async (req, res) => {
  try {
    const result = await executeSwap(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
