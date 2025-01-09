// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ERPData {
    struct DataEntry {
        uint id;
        string dataHash;
    }
    
    mapping(uint => DataEntry) public dataEntries;
    uint public entryCount;

    // Function to add a new data entry
    function addDataEntry(string memory _dataHash) public {
        entryCount++;
        dataEntries[entryCount] = DataEntry(entryCount, _dataHash);
    }

    // Function to retrieve a specific data entry by id
    function getDataEntry(uint _id) public view returns (uint, string memory) {
        DataEntry memory entry = dataEntries[_id];
        return (entry.id, entry.dataHash);
    }
}
