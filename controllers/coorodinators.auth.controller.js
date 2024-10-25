const ethers = require('ethers');
const CoordinatorModel = require('../models/coordinator.models');
async function coordinatorAuth(req, res, next) {
    try {
        const { signature, usn, branch, graduationYear } = req.body;
        const { address } = req.query;

        if (!signature) {
            throw new Error('Signature is required');
        }
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to OppertuNIEty - admin platform!", signature);
        // console.log(recoveredAddress);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        } else {
            const address = recoveredAddress.toLowerCase();
            const user = await CoordinatorModel.findOne({ userAddress: address });
            if (!user) {
                const newUser = await CoordinatorModel.create({ userAddress: address, usn, branch, graduationYear });
                console.log("User created successfully", newUser);
            }
            res.status(200).json({ message: 'Signature verification successful' });
        }

        // some code here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}
module.exports = { coordinatorAuth };