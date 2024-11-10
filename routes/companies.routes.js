const express = require('express');
const { addCompany, getCompanies, getCompanyById } = require('../controllers/companies.contoller');
const { verifyCoordinator, verifyStudentOrCoordinator } = require('../middleware/auth');

const router = express.Router();

router.post('/companies/post', verifyCoordinator, addCompany);
router.get('/companies/get-companies', verifyStudentOrCoordinator, getCompanies);
router.get('/companies/get-company-by-id/:companyId', verifyStudentOrCoordinator, getCompanyById);

module.exports = router;