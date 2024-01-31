// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// EVM => Ethereum Virtual Machine => how to deplay smart contract into blockchian
// EVM compatible blockchain => avalanche, Fantom, Polygon

contract SimpleStorage {
    uint256 favouriteNumber = 25;

    mapping(string => uint256) public nameToFavouriteNumber;

    People[] public people;

    struct People {
        uint256 favouriteNumber;
        string name;
    }

    function store(uint256 _favouriteNumber) public virtual   {
        favouriteNumber = _favouriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    function add() public pure returns (uint256) {
        return 1 + 1;
    }

    function addPerson (string memory _name, uint256 _favouriteNumber) public {
        people.push(People({
            favouriteNumber : _favouriteNumber,
            name : _name
        }));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}