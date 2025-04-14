// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    // Define a struct for user profile data
    struct UserProfileData {
        string name;
        string xPercentage;
        string xiiPercentage;
        string cgpa;
        string dob;
        string phone;
        string email;
        string[] coreSkills;
        string resume;
    }

    // Mapping from user address to user profile
    mapping(address => UserProfileData) public userProfiles;

    // Event for when a user profile is updated
    event UserProfileUpdated(address indexed user, string name, string cgpa);

    // Event for when a user uploads a resume
    event ResumeUploaded(address indexed user, string ipfsHash);

    // View function to get the user profile of the caller
    function getUserProfile() public view returns (UserProfileData memory) {
        return userProfiles[msg.sender];
    }

    // View function to get the user profile by address
    function getUserProfileByAddress(
        address userAddress
    ) public view returns (UserProfileData memory) {
        return userProfiles[userAddress];
    }

    // Function to set the user profile data
    function setUserProfile(
        string memory _name,
        string memory _xPercentage,
        string memory _xiiPercentage,
        string memory _cgpa,
        string memory _dob,
        string memory _phone,
        string memory _email,
        string[] memory _coreSkills
    ) public {
        UserProfileData storage profile = userProfiles[msg.sender];
        profile.name = _name;
        profile.xPercentage = _xPercentage;
        profile.xiiPercentage = _xiiPercentage;
        profile.cgpa = _cgpa;
        profile.dob = _dob;
        profile.phone = _phone;
        profile.email = _email;
        profile.coreSkills = _coreSkills;

        emit UserProfileUpdated(msg.sender, _name, _cgpa);
    }

    // Function to upload a resume (IPFS hash)
    function uploadResume(string memory _ipfsHash) public {
        userProfiles[msg.sender].resume = _ipfsHash;

        emit ResumeUploaded(msg.sender, _ipfsHash);
    }

    // View function to retrieve the resume (IPFS hash)
    function viewResume() public view returns (string memory) {
        return userProfiles[msg.sender].resume;
    }
}
