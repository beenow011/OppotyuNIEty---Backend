const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    userAddress: {
        type: "string",
        required: true
    },
    encrypton: {
        type: Buffer,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    usn: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    resumeCollected: {
        type: Boolean,
        default: false
    },
    documentsCollected: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const StudentModel = mongoose.model('students', Student);
module.exports = StudentModel;