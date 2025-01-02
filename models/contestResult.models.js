
const mongoose = require('mongoose');

const ContestResults = new mongoose.Schema({
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contests',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },

    score: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: String,
        required: true
    },
});

const ContestResultModel = mongoose.model('contestResults', ContestResults);
module.exports = ContestResultModel;