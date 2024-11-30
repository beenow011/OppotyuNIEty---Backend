const express = require('express');
const { verifyCoordinator, verifyStudentOrCoordinator, verifyStudent } = require('../middleware/auth');
const { uploadInterviewQuestions, getInterviewQuestions, getInterviewQuestionsOfType, createInterviewSession, getInterviewSession, MockInterviewConversation, StartinterviewSession, continueInterviewSession } = require('../controllers/mockInterview.controller');


const router = express.Router();

router.post('/mock-interview/upload-interview-questions/:id', verifyCoordinator, uploadInterviewQuestions);
router.get('/mock-interview/get-interview-questions/:id', verifyStudentOrCoordinator, getInterviewQuestions);
router.get('/mock-interview/get-interview-questions/:id/:type', verifyStudent, getInterviewQuestionsOfType);
router.post('/mock-interview/create-interview-session', verifyStudent, createInterviewSession);
router.get('/mock-interview/get-interview-session/:id/:type', verifyStudent, getInterviewSession);
router.post('/mock-interview/start-interview-session', verifyStudent, StartinterviewSession);
router.post('/mock-interview/continue-interview-conversation', verifyStudent, continueInterviewSession);
router.post('/mock-interview/get-interview-conversation', verifyStudent, MockInterviewConversation);
// router.post('/mock-interview/create-interview-session', verifyStudent, createInterviewSession);

module.exports = router;