import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { config } from "../config";
import { DEX_ABI, ERC20_ABI, ROUTER_ABI } from "../abi";

export function getProvider(): JsonRpcProvider {
  return new JsonRpcProvider(config.rpcUrl);
}

export function getSigner(): Wallet {
  return new Wallet(config.privateKey, getProvider());
}

export function getDexContract(address: string, signerOrProvider = getProvider()): Contract {
  return new Contract(address, DEX_ABI, signerOrProvider);
}

export function getRouterContract() {
  return new Contract(config.routerAddress, ROUTER_ABI, getSigner());
}

export function getTokenContract(address: string) {
  return new Contract(address, ERC20_ABI, getSigner());
}
