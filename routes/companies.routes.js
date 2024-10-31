const express = require('express');
const { addCompany, getCompanies, getCompanyById } = require('../controllers/companies.contoller');
const { verifyCoordinator } = require('../middleware/auth');

const router = express.Router();

router.post('/companies/post', verifyCoordinator, addCompany);
router.get('/companies/get-companies', verifyCoordinator, getCompanies);
router.get('/companies/get-company-by-id/:companyId', verifyCoordinator, getCompanyById);

module.exports = router;