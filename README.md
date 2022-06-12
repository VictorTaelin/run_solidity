run_solidity
============

Runs the `main()` function of all contracts in a Solidity file.

Installing
==========

1. [Install the Solidity compiler](https://docs.soliditylang.org/en/v0.8.14/installing-solidity.html)

2. [Install Ganache](https://trufflesuite.com/ganache/)

3. Install `run_solidity`: `npm i -g run_solidity`

Usage
=====

Start the local Ganache network:

```
NODE_OPTIONS=--openssl-legacy-provider ganache-cli
```

Create a Solidity contract and save as `main.sol`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <=0.9.0;

contract Example {

  event Hello(uint256 number);

  function main() public {
    for (uint i = 0; i < 10; ++i) {
      emit Hello(i);
    }
    buy(500);
  }
      
}
```

Enter the command `run_solidity main.sol`.

This will run the `main()` function on each contract on `main.sol`, show events emitted and gas used.

That's all.
