const express = require('express');
const { createAccount, login, studentStatus, uploadStudentResume, updateResumeStatus } = require('../controllers/students.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');

const router = express.Router();

router.post('/student-auth/create-account', createAccount)
router.post('/student-auth/login', login)
router.get('/student-auth/student-status', studentStatus)
router.post('/student-auth/upload-resume', uploadUserImage, uploadStudentResume)
router.post('/student-auth/resume-status', updateResumeStatus)


module.exports = router;
