const mongoose = require('mongoose');

const MockInterviewConversation = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interviewSessions',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isUserMsg: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MockInterviewConversationModel = mongoose.model('mockInterviewConversations', MockInterviewConversation);
module.exports = MockInterviewConversationModel;