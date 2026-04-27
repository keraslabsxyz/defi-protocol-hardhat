# 🧪 Blockchain Assessment Project(30 mins)

## Overview
This project simulates a simplified trade routing system interacting with smart contracts.

The assessment is structured in **two phases**:

1. **Setup & Deployment**
2. **Feature Completion & Fixes**

You are not expected to complete everything — focus on what you can within ~30 minutes.

---

# 🚀 Phase 1 — Contract Deployment (Required First)

Before starting the challenges, ensure the contracts are deployed locally.

### Steps

1. Install dependencies
```bash
npm install
```

2. Start local blockchain
```bash
npx hardhat node
```

3. Deploy contracts
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

4. Verify:
- Contracts are deployed successfully
- Addresses are populated in `.env`

---

# ⚙️ Phase 2 — Challenges

Once deployment is complete, proceed with the following tasks.

---

## 🧱 Node.js / Backend Challenges

### 1. Fix Routing Logic
- File: `src/services/quoteService.js`
- Issue: The service selects the wrong liquidity source  
- Goal: Ensure the **best (highest output)** quote is selected

---

### 2. Add Slippage Protection
- File: `src/services/swapService.ts` (or similar)
- Issue: Missing validation for `minAmountOut`
- Goal: Prevent execution if expected output is below threshold

---

## 🔐 Smart Contract Challenges

### 3. Fix Vault Vulnerability
- File: `contracts/Vault.sol`
- Issue: Reentrancy vulnerability
- Goal:
  - Fix state update order
  - Prevent reentrancy attack

---

### 4. Complete Pricing Logic
- File: `contracts/MockDex.sol` or `FeeMath.sol`
- Issue: Missing implementation
- Goal:
- Apply 0.3% fee correctly

---

### 5. Add Access Control
- File: `contracts/Config.sol`
- Issue: Anyone can call `setFee`
- Goal:
- Restrict to owner-only

---

## 🧪 Tests (Optional but Strong Signal)
- Fix failing tests in `/test`
- Ensure all pass after your changes

---
## Where to Look
- `src/services/quoteService.ts`
- `src/services/swapService.ts`
- `contracts/FeeMath.sol`
- `contracts/Config.sol`
- `contracts/Vault.sol`
- `test/assessment.spec.ts`
- `test/general-assessment.spec.ts`

## Expected Time
20–30 minutes.

## Setup
```bash
npm install
npm test
```

## Run locally
Start a local Hardhat node in one terminal:
```bash
npx hardhat node
```

Deploy contracts in another terminal:
```bash
npx hardhat run scripts/deploy.ts --network hardhat
```

Copy the deployed addresses into `.env` based on `.env.example`, then start the API:
```bash
npm run dev
```

## Endpoints
### `GET /health`
Returns service status.

### `GET /quote`
Example:
```bash
curl "http://localhost:3000/quote?tokenIn=0xTOKENA&tokenOut=0xTOKENB&amountIn=1000000000000000000"
```

### `POST /swap`
Example:
```bash
curl -X POST http://localhost:3000/swap \
  -H "Content-Type: application/json" \
  -d '{
    "tokenIn": "0xTOKENA",
    "tokenOut": "0xTOKENB",
    "amountIn": "1000000000000000000",
    "minAmountOut": "1000000000000000000",
    "recipient": "0xRECIPIENT"
  }'
```

## Delivery Rules
- push your branch
- open a pull request
- `[feat]:[comment]` or `[fix]:[comment]`

## Branch Name Rule
Use this branch name format:
- `[name]-assessment`

## Deliverable
Please return:
- Pull request link
- Passing tests
- Short explanation of changes
