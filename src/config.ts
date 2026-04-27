import * as dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "PORT",
  "RPC_URL",
  "PRIVATE_KEY",
  "TOKEN_A_ADDRESS",
  "TOKEN_B_ADDRESS",
  "DEX_ONE_ADDRESS",
  "DEX_TWO_ADDRESS",
  "ROUTER_ADDRESS",
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    // Intentionally forgiving for test setup.
    process.env[key] = process.env[key] ?? "";
  }
}

export const config = {
  port: Number(process.env.PORT || 3000),
  rpcUrl: process.env.RPC_URL || "http://127.0.0.1:8545",
  privateKey: process.env.PRIVATE_KEY || "",
  tokenAAddress: process.env.TOKEN_A_ADDRESS || "",
  tokenBAddress: process.env.TOKEN_B_ADDRESS || "",
  dexOneAddress: process.env.DEX_ONE_ADDRESS || "",
  dexTwoAddress: process.env.DEX_TWO_ADDRESS || "",
  routerAddress: process.env.ROUTER_ADDRESS || "",
};
