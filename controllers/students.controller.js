const { ethers } = require("ethers");
const jwt = require('jsonwebtoken');
const StudentModel = require("../models/students.models");
const { JWT_KEY, PINATA_API_KEY, PINATA_SECRET_API_KEY } = require("../config/config");
const { generateEncryptionKey } = require("../utils/genKey");
const { encryptFile } = require("../utils/encrypt");
const pinataSDK = require('@pinata/sdk');
const getContractInstance = require("../utils/getContractInstance");

async function createAccount(req, res) {
    try {

        const { address } = req.query;
        const { name, usn, branch, signature } = req.body;


        const recoveredAddress = ethers.utils.verifyMessage("Welcome to OppertuNIEty - admin platform!", signature);
        // console.log(recoveredAddress);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        }

        const student = await StudentModel.findOne({
            $or: [{ userAddress: address }, { usn: usn }]
        });

        if (student) {
            throw new Error("User already exists");
        }


        const newUser = await StudentModel.create({
            userAddress: address,
            name,
            usn: usn.toLowerCase(),
            branch
        });
        if (!newUser) {
            console.error('Failed to create user in MongoDB');
            return res.status(500).json({ error: 'Failed to create user in MongoDB' });
        }
        console.log("User created successfully", newUser);
        const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Signature verification successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { signature } = req.body;
        const { address } = req.query;
        if (!signature) {
            throw new Error('Signature is required');
        }
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to OppertuNIEty - admin platform!", signature);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        }
        const user = await StudentModel.findOne({ userAddress: address });
        if (!user) {
            throw new Error('User not found');
        }
        const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Signature verification successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function studentStatus(req, res) {
    try {
        const { address: userAddress } = req.query;
        const user = await StudentModel
            .findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json({ status: user.documentsCollected });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

}

async function uploadStudentResume(req, res) {
    try {
        const { address: userAddress } = req.query;
        // console.log('Uploading file for:', req);
        const user = await StudentModel
            .findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.encryption) {
            console.log('Encryption key is null or undefined');
            const encryptionKey = generateEncryptionKey(32);
            user.encryption = encryptionKey;
            await user.save();
            console.log('Encryption key generated:', encryptionKey);
        }
        const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_API_KEY });
        const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryption);
        const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv });

        res.status(200).json({ ipfsHash: resPinata.IpfsHash, message: "File Uploaded", fileName: req.file.originalname });




    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

}

async function updateResumeStatus(req, res) {
    try {
        const { address: userAddress } = req.query;
        const user = await StudentModel
            .findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }
        user.resumeCollected = true;
        await user.save();
        res.status(200).json({ message: "Resume status updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

}

// async function uploadStudentData(req, res) {
//     try {
//         const { address: userAddress } = req.query;
//         const user = await StudentModel
//             .findOne({ userAddress });
//         if (!user) {
//             throw new Error("User not found");
//         }

//         if (!user.encryption) {
//             console.log('Encryption key is null or undefined');
//             const encryptionKey = generateEncryptionKey(32);
//             user.encryption = encryptionKey;
//             await user.save();
//             console.log('Encryption key generated:', encryptionKey);
//         }


//         // const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryption);
//         const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_API_KEY });


//         const ipfsResults = await Promise.all(req.files.map(async (file) => {
//             // Encrypt the file data
//             const { encryptedData, iv } = encryptFile(file.buffer, user.encryption);

//             // Pin the encrypted data and IV to IPFS
//             const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv });

//             return { ipfsHash: resPinata.IpfsHash, message: "File Uploaded", fileName: file.originalname };
//         }));



//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }

// }

module.exports = { createAccount, login, studentStatus, uploadStudentResume, updateResumeStatus };