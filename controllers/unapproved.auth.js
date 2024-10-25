const CoordinatorModel = require('../models/coordinator.models');
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
module.exports = { unapproved };