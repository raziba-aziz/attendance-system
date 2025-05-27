// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    address public owner;
    mapping(address => bool) public attendance;
    address[] public attendees;

    constructor() {
        owner = msg.sender;
    }

    function markAttendance() public {
        require(!attendance[msg.sender], "Attendance already marked.");
        attendance[msg.sender] = true;
        attendees.push(msg.sender);
    }

    function checkAttendance(address student) public view returns (bool) {
        return attendance[student];
    }

    function getAttendees() public view returns (address[] memory) {
        return attendees;
    }

    function getTotalAttendees() public view returns (uint256) {
        return attendees.length;
    }
}
