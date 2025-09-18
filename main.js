const { ethers } = require("ethers");

// Berachain Testnet Configuration
const RPC_URL = "https://rpc.nexus.xyz";
const PRIVATE_KEY = "your private key here";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ABI and Bytecode (Replace with your own)
const CONTRACT_ABI = []; // Minimal ABI (not required for deployment)
const CONTRACT_BYTECODE = "0x60806040527389a512a24e9d63e98e41f681bf77f27a7ef89eb76000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163460405161009f90610185565b60006040518083038185875af1925050503d80600081146100dc576040519150601f19603f3d011682016040523d82523d6000602084013e6100e1565b606091505b5050905080610125576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011c9061019a565b60405180910390fd5b506101d6565b60006101386007836101c5565b91507f4661696c757265000000000000000000000000000000000000000000000000006000830152602082019050919050565b60006101786000836101ba565b9150600082019050919050565b60006101908261016b565b9150819050919050565b600060208201905081810360008301526101b38161012b565b9050919050565b600081905092915050565b600082825260208201905092915050565b603f806101e46000396000f3fe6080604052600080fdfea264697066735822122095fed2c557b62b9f55f8b3822b0bdc6d15fd93abb95f37503d3f788da6cbb30064736f6c63430008000033"

// Function to deploy a contract
async function deployContract() {
    console.log("Deploying contract...");
     
    try {
        // Create a Contract Factory
        const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, wallet);

    // Deploy the Contract with gas limit
    const contract = await factory.deploy({ gasLimit: 100000 });
    console.log(`Contract deployed at: ${contract.target}`);
    console.log("Waiting for confirmation...");

    // Wait for the transaction to be mined
    await contract.deploymentTransaction().wait();
    console.log(`Contract confirmed at: ${contract.target}`);
    } catch (err) {
        console.error("Error deploying contract:", err);
    }
}

// Function to deploy contracts at random intervals
async function deployAtRandomIntervals() {
    while (true) {
        await deployContract();

        // Generate a random delay between 60 and 90 seconds
        const randomDelay = Math.floor(Math.random() * 31) + 3600; // Random value between 60 and 90
        console.log(`Next deployment in ${randomDelay} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, randomDelay * 1000));
    }
}

// Start the bot
deployAtRandomIntervals();
