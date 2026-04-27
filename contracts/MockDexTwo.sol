// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MockDexBase.sol";

contract MockDexTwo is MockDexBase {
    constructor() MockDexBase(10, 10_100) {}
}
