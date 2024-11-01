const StudentModel = require("../models/students.models");

async function createAccount(req, res) {
    try {

        const { address } = req.query;
        const { name, usn, branch, signature } = req.body;

        const recoveredAddress = ethers.utils.verifyMessage("Welcome to OppertuNIEty - admin platform!", signature);
        // console.log(recoveredAddress);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        }

        const student = await StudentModel.findOne({ userAddress: address });

        if (student) {
            throw new Error("User already exists");
        }

        const newStudent = new StudentModel({
            userAddress: address,
            name,
            usn: usn.toLowerCase(),
            branch
        });

        const token = jwt.sign({ userAddress: address }, JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Signature verification successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createAccount }