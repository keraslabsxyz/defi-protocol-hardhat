// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Vault {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        require(msg.value > 0, "value=0");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");

        // Intentional assessment bug:
        // external call happens before state update, enabling reentrancy.
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;
    }
}
