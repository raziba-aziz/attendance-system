import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Deployed contract address

const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "attendance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "checkAttendance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "markAttendance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      alert("✅ Wallet connected!");
      return true;
    } catch (err) {
      console.error("Connection error:", err);
      alert("❌ Failed to connect wallet.");
      return false;
    }
  } else {
    alert("⚠️ Please install MetaMask.");
    return false;
  }
};

export const markAttendance = async () => {
  try {
    if (!contract) await connectWallet();
    const tx = await contract.markAttendance();
    await tx.wait();
    alert("✅ Attendance marked!");
  } catch (err) {
    console.error("Error marking attendance:", err);
    alert("❌ Failed to mark attendance.");
  }
};

export const checkAttendance = async () => {
  try {
    if (!contract) await connectWallet();
    const userAddress = await signer.getAddress();
    const result = await contract.checkAttendance(userAddress);
    alert(`📋 Your attendance is: ${result ? "Present ✅" : "Not marked ❌"}`);
    return result;
  } catch (err) {
    console.error("Error checking attendance:", err);
    alert("❌ Failed to check attendance.");
    return false;
  }
};
