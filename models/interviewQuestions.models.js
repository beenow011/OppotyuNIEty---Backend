const mongoose = require('mongoose');

const interviewQuestionModel = new mongoose.Schema({
    questions: {
        type: String,
        required: true
    },
    round: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    }
});

module.exports = mongoose.model("interviewQuestions", interviewQuestionModel);
