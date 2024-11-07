const express = require('express');
const { createAccount, login, studentStatus } = require('../controllers/students.controller');

const router = express.Router();

router.post('/student-auth/create-account', createAccount)
router.post('/student-auth/login', login)
router.get('/student-auth/student-status', studentStatus)


module.exports = router;
