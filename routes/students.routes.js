const express = require('express');
const { createAccount, login, studentStatus, uploadStudentResume, updateResumeStatus, getResumeStatus, getResume, SetStudentStatus } = require('../controllers/students.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');

const router = express.Router();

router.post('/student-auth/create-account', createAccount)
router.post('/student-auth/login', login)
router.get('/student-auth/student-status', studentStatus)
router.post('/student-auth/upload-resume', uploadUserImage, uploadStudentResume)
router.post('/student-auth/resume-status', updateResumeStatus)
router.get('/student-auth/get-resume-status', getResumeStatus)
router.post('/student-auth/get-resume', getResume)
router.post('/student-auth/set-student-status', SetStudentStatus)


module.exports = router;
