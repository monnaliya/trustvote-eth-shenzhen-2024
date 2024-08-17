// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrustVote {
    // Poll structure
    struct Poll {
        uint id;
        string title;
        string description;
        string[] options;
        mapping(uint => uint) votes;
        bool exists;
        bool completed;
        uint startTime;
        uint endTime;
    }

    // Polls storage
    mapping(uint => Poll) public polls;
    uint public pollCount;

    // User's voting record
    mapping(address => mapping(uint => bool)) public hasVoted;

    // Events
    event PollCreated(uint pollId, string title, string description);
    event VoteCasted(uint pollId, uint optionId, address voter);

    // Create a new poll
    function createPoll(string memory _title, string memory _description, string[] memory _options, uint _startTime, uint _endTime) public {
        require(_startTime < _endTime, "Start time must be before end time");
        require(_options.length > 1, "There must be at least two options");

        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.id = pollCount;
        newPoll.title = _title;
        newPoll.description = _description;
        newPoll.options = _options;
        newPoll.startTime = _startTime;
        newPoll.endTime = _endTime;
        newPoll.exists = true;

        emit PollCreated(pollCount, _title, _description);
    }

    // Vote on a poll
    function vote(uint _pollId, uint _optionId) public {
        require(polls[_pollId].exists, "Poll does not exist");
        require(block.timestamp >= polls[_pollId].startTime, "Poll has not started yet");
        require(block.timestamp <= polls[_pollId].endTime, "Poll has ended");
        require(!hasVoted[msg.sender][_pollId], "User has already voted");

        polls[_pollId].votes[_optionId]++;
        hasVoted[msg.sender][_pollId] = true;

        emit VoteCasted(_pollId, _optionId, msg.sender);
    }

    // Complete a poll and view results
    function completePoll(uint _pollId) public view returns (uint[] memory) {
        require(polls[_pollId].exists, "Poll does not exist");
        require(block.timestamp > polls[_pollId].endTime, "Poll is still ongoing");
        require(!polls[_pollId].completed, "Poll has already been completed");

        uint[] memory results = new uint[](polls[_pollId].options.length);
        for (uint i = 0; i < polls[_pollId].options.length; i++) {
            results[i] = polls[_pollId].votes[i];
        }

        return results;
    }
}
