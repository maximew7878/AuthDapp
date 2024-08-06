const Auth = require("../contracts/Auth.json");

const { Web3 } = require("web3");

const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);

const deployedNetwork = Auth.networks[5777];
const contract = new web3.eth.Contract(Auth.abi, deployedNetwork.address);
const account = async () => {
    return await web3.eth.getAccounts();
};

module.exports = { Auth: contract, account };
