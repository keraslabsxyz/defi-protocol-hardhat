// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MockDexBase.sol";

contract MockDexOne is MockDexBase {
    constructor() MockDexBase(30, 10_200) {}
}
