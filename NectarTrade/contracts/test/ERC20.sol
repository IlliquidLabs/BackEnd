pragma solidity =0.5.16;

import '../HoneyERC20.sol';

contract ERC20 is HoneyERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
