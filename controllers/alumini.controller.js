const { ethers } = require("ethers");
const AluminiModel = require("../models/alumini.models");
const { JWT_KEY } = require("../config/config");


async function aluminiSignup(req, res) {
    try {
        const { signature, branch, graduationYear, name } = req.body;
        const { address } = req.query;
        console.log(1)
        if (!address) {
            throw new Error('Address is required');
        }
        console.log(2)

        if (!signature) {
            throw new Error('Signature is required');
        }
        console.log(3)
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to OppertuNIEty - admin platform!", signature);
        console.log(4)
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        }
        console.log(5)
        const user = await AluminiModel.findOne({ userAddress: address });
        if (user) {
            throw new Error('User already exists');
        }
        console.log(6)
        const alumini = await AluminiModel.create({
            name,
            userAddress: address,
            branch,
            yearOfPassing: graduationYear
        });
        console.log(7)
        const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });
        console.log(8)
        return res.status(200).json({
            message: "Alumini signed up successfully",
            alumini, token
        });

    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

module.exports = {
    aluminiSignup
}