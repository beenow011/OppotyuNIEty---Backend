const ethers = require('ethers');
const CoordinatorModel = require('../models/coordinator.models');
const { transporter } = require('../utils/nodemailer');
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

            res.status(200).json({ message: 'Signature verification successful' });
        }

        // some code here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}
module.exports = { coordinatorAuth };