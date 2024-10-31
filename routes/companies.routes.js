const express = require('express');
const { addCompany } = require('../controllers/companies.contoller');
const { verifyCoordinator } = require('../middleware/auth');

const router = express.Router();

router.post('/companies/post', verifyCoordinator, addCompany);

module.exports = router;