// const { ethers } = require("ethers");
// const contractAbi = require("../contracts/contractAbi.json");

// const getContractInstance = async () => {
//     try {

//         const contractAddress = "0x4060b27703257a6E415Df7c56432E948708E6E9a"
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);


//     } catch (err) {
//         console.error(err);
//         throw new Error(err.message);
//     }

//     return contractInstance;
// }



// module.exports = getContractInstance;