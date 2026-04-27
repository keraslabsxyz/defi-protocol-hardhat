import { expect } from "chai";
import { ethers } from "hardhat";

describe("general blockchain challenges", function () {
  it("FeeMath should apply a 0.3% fee", async function () {
    const FeeMath = await ethers.getContractFactory("FeeMath");
    const feeMath = await FeeMath.deploy();

    const amountIn = 1_000_000n;
    const amountOut = await feeMath.getAmountOutAfterFee(amountIn);

    expect(amountOut).to.equal(997_000n);
  });

  it("Config should only allow the owner to set feeBps", async function () {
    const [owner, other] = await ethers.getSigners();

    const Config = await ethers.getContractFactory("Config");
    const config = await Config.deploy();

    await config.connect(owner).setFeeBps(50);
    expect(await config.feeBps()).to.equal(50n);

    await expect(config.connect(other).setFeeBps(75)).to.be.revertedWith("only owner");
  });

  it("Vault should resist a simple reentrancy attack", async function () {
    const [owner, victim] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();

    await vault.connect(victim).deposit({ value: ethers.parseEther("1") });

    const Attacker = await ethers.getContractFactory("VaultAttacker");
    const attacker = await Attacker.connect(owner).deploy(await vault.getAddress());

    await expect(
      attacker.connect(owner).attack({ value: ethers.parseEther("0.1") })
    ).to.be.reverted;
  });
});
