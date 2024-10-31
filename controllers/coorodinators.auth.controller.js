const ethers = require('ethers');
const CoordinatorModel = require('../models/coordinator.models');
const { transporter } = require('../utils/nodemailer');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/config');
async function coordinatorAuth(req, res, next) {
    try {
        const { signature, usn, branch, graduationYear, name } = req.body;
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
                const newUser = await CoordinatorModel.create({ userAddress: address, usn, branch, graduationYear, name });
                console.log("User created successfully", newUser);

                const info = await transporter.sendMail({
                    from: '"OpportuNIEty" <no-reply@opportuniety.com>', // sender address
                    to: "abhinavnb11@gmail.com", // admin's email
                    subject: "New Coordinator Registration - Approval Required", // Subject line
                    text: `A new coordinator has registered and is awaiting approval:
                        - USN: ${usn}
                        - Branch: ${branch}
                        - Graduation Year: ${graduationYear}
                        - Wallet Address: ${address}`,
                    html: `<p>A new coordinator has registered and is awaiting approval:</p>
                        <ul>
                            <li><strong>USN:</strong> ${usn}</li>
                            <li><strong>Branch:</strong> ${branch}</li>
                            <li><strong>Graduation Year:</strong> ${graduationYear}</li>
                            <li><strong>Wallet Address:</strong> ${address}</li>
                        </ul>
                        <p>Please log in to the admin portal to review and approve this coordinator.</p>`
                });

                console.log("Message sent: %s", info.messageId);
            }
            const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Signature verification successful', token });
        }

        // some code here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

async function login(req, res, next) {
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
        const user = await CoordinatorModel.findOne({ userAddress: address });
        if (!user) {
            throw new Error('User not found');
        }
        const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Signature verification successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function unapproved(req, res, next) {
    try {

        const { address } = req.query
        if (!address) {
            throw new Error('Address is required');
        }
        if (address.toLowerCase() !== "0x8119779A622fCBab9c084D9036A5C60A7E7185Fa".toLowerCase()) {
            throw new Error('Address is not valid');
        }
        const unapprovedCoordinators = await CoordinatorModel.find({ approvedStatus: false });
        res.status(200).json({ unapprovedCoordinators });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getStatus(req, res, next) {
    try {
        const { userAddress } = req.query;
        const user = await CoordinatorModel.findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json({ approvedStatus: user.approvedStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function approveCoordinator(req, res, next) {
    try {
        const { userAddress } = req.body;
        const { address } = req.query
        if (!address) {
            throw new Error('Address is required');
        }
        if (address.toLowerCase() !== "0x8119779A622fCBab9c084D9036A5C60A7E7185Fa".toLowerCase()) {
            throw new Error('You are not authorized');
        }
        const user = await CoordinatorModel.findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }
        user.approvedStatus = true;
        await user.save();
        res.status(200).json({ message: 'Coordinator approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
async function dissApproveStatus(req, res) {
    try {
        const { userAddress } = req.body;
        const { address } = req.query
        if (!address) {
            throw new Error('Address is required');
        }
        if (address.toLowerCase() !== "0x8119779A622fCBab9c084D9036A5C60A7E7185Fa".toLowerCase()) {
            throw new Error('You are not authorized');
        }
        const user = await CoordinatorModel.findOne({ userAddress });
        if (!user) {
            throw new Error("User not found");
        }
        CoordinatorModel.deleteOne({ userAddress });
        res.status(200).json({ message: 'Coordinator disapproved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}
module.exports = { coordinatorAuth, getStatus, unapproved, approveCoordinator, dissApproveStatus, login };