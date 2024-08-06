// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract Auth{
    struct User{
        string name;
        string email;
        string password;
    }

    User[] user;
    mapping(string =>uint) emailIndex;

    function createUser(string memory _name, string memory _email, string memory _password) public {
        uint index = emailIndex[_email];
        require(index ==0 ,"already exist");
        user.push(User(_name,_email,_password));
        emailIndex[_email] = user.length;
    }

    function getUser(string memory _email) public view returns(string memory, string memory, string memory){
        uint index = emailIndex[_email];
        require(index != 0,"User not found");
        User memory u = user[index -1];
        return (u.name, u.email, u.password);
    }

    function updateName(string memory _email , string memory _name) public{
        uint index = emailIndex[_email];
        require(index !=0,"user not found");
        user[index-1].name = _name;
    }
}