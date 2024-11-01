const express = require('express');
const { createAccount } = require('../controllers/students.controller');

const router = express.Router();

router.post('/student-auth/create-account', createAccount)


module.exports = router;
