const mongoose = require('mongoose');

const Coordinator = new mongoose.Schema({
    userAddress: {
        type: "string",
        required: true
    },
    usn: {
        type: "string",
        required: true
    },
    branch: {
        type: "string",
        required: true
    },
    graduationYear: {
        type: "number",
        required: true
    },
    approvedStatus: {
        type: "boolean",
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const CoordinatorModel = mongoose.model('users', Coordinator);
module.exports = CoordinatorModel;