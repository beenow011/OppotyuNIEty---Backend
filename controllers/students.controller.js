const { ethers } = require("ethers");
const jwt = require('jsonwebtoken');
const StudentModel = require("../models/students.models");
const { JWT_KEY } = require("../config/config");

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

module.exports = { createAccount, login, studentStatus };