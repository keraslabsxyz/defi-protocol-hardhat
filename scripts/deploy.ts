import { ethers } from "hardhat";
import BN from "ether-bn.js";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const deployer = await provider.getSigner();
  // const [deployer] = await ethers.getSigners();

  if (!deployer || !deployer.address) {
    throw new Error("Deployer signer not found");
  }

  // Use BN instead of hardcoded string
  const initialSupplyBN = new BN("1000000");
  const liquidityBN = new BN("100000");

  // Convert BN → string → parseEther
  const initialSupply = ethers.parseEther(initialSupplyBN.toString());
  const liquidityAmount = ethers.parseEther(liquidityBN.toString());

  // Basic validation (still using bigint from ethers)
  if (initialSupply <= 0n) {
    throw new Error("Initial supply must be greater than zero");
  }

  if (liquidityAmount <= 0n) {
    throw new Error("Liquidity amount must be greater than zero");
  }

  if (liquidityAmount > initialSupply) {
    throw new Error("Liquidity cannot exceed total supply");
  }

  const Token = await ethers.getContractFactory("MockERC20");

  const tokenA = await Token.deploy(
    "Token A",
    "TKA",
    18,
    initialSupply,
    deployer.address,
  );
  await tokenA.waitForDeployment();

  const tokenB = await Token.deploy(
    "Token B",
    "TKB",
    18,
    initialSupply,
    deployer.address,
  );
  await tokenB.waitForDeployment();

  const DexOne = await ethers.getContractFactory("MockDexOne");
  const dexOne = await DexOne.deploy();
  await dexOne.waitForDeployment();

  const DexTwo = await ethers.getContractFactory("MockDexTwo");
  const dexTwo = await DexTwo.deploy();
  await dexTwo.waitForDeployment();

  const Router = await ethers.getContractFactory("Router");
  const router = await Router.deploy();
  await router.waitForDeployment();

  const dexOneAddress = await dexOne.getAddress();
  const dexTwoAddress = await dexTwo.getAddress();

  if (!ethers.isAddress(dexOneAddress) || !ethers.isAddress(dexTwoAddress)) {
    throw new Error("Invalid DEX address");
  }

  await (await tokenB.transfer(dexOneAddress, liquidityAmount)).wait();
  await (await tokenB.transfer(dexTwoAddress, liquidityAmount)).wait();

  const dexOneBalance = await tokenB.balanceOf(dexOneAddress);
  const dexTwoBalance = await tokenB.balanceOf(dexTwoAddress);

  if (dexOneBalance < liquidityAmount || dexTwoBalance < liquidityAmount) {
    throw new Error("Liquidity transfer failed");
  }

  console.log({
    deployer: deployer.address,
    tokenA: await tokenA.getAddress(),
    tokenB: await tokenB.getAddress(),
    dexOne: dexOneAddress,
    dexTwo: dexTwoAddress,
    router: await router.getAddress(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});