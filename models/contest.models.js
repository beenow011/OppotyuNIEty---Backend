
const mongoose = require('mongoose');

const Contest = new mongoose.Schema({
    contestName: {
        type: String,
        required: true
    },
    scheduledTime: {  // Fixed spelling
        type: String,
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: {
            type: [String],  // Assuming options are strings
            required: true
        },
        correctAnswer: {
            type: String,
            required: true
        }
    }],
    contestStatus: {
        type: Boolean,  // Removed quotes
        default: true
    }
});
const ContestModel = mongoose.model('contests', Contest);
module.exports = ContestModel;