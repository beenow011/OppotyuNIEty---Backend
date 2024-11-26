const mongoose = require('mongoose');

const InterviewSession = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    interviewType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const InterviewSessionModel = mongoose.model('interviewSessions', InterviewSession);
module.exports = InterviewSessionModel;