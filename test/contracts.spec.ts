import { expect } from "chai";
import { ethers } from "hardhat";

describe("mock contracts", function () {
  it("MockDexOne returns a quote greater than zero", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockERC20");
    const tokenA = await Token.deploy("Token A", "TKA", 18, ethers.parseEther("1000000"), owner.address);
    const tokenB = await Token.deploy("Token B", "TKB", 18, ethers.parseEther("1000000"), owner.address);

    const DexOne = await ethers.getContractFactory("MockDexOne");
    const dexOne = await DexOne.deploy();

    await tokenB.transfer(await dexOne.getAddress(), ethers.parseEther("1000"));

    const quote = await dexOne.getQuote(await tokenA.getAddress(), await tokenB.getAddress(), ethers.parseEther("1"));
    expect(quote).to.be.gt(0);
  });
});
