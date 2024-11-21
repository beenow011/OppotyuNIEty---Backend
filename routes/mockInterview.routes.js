const express = require('express');
const { verifyCoordinator, verifyStudentOrCoordinator } = require('../middleware/auth');
const { uploadInterviewQuestions, getInterviewQuestions } = require('../controllers/mockInterview.controller');


const router = express.Router();

router.post('/mock-interview/upload-interview-questions/:id', verifyCoordinator, uploadInterviewQuestions);
router.get('/mock-interview/get-interview-questions/:id', verifyStudentOrCoordinator, getInterviewQuestions);

module.exports = router;