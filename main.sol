// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <=0.9.0;

contract Example {

  event Hello(uint256 number);

  function main() public {
    for (uint i = 0; i < 10; ++i) {
      emit Hello(i);
    }
  }
      
}

