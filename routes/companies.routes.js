const express = require('express');
const { addCompany, getCompanies, getCompanyById, applyToCompany, getApplicationStatus, getAppliedCompanies, allStudentsApplied } = require('../controllers/companies.contoller');
const { verifyCoordinator, verifyStudentOrCoordinator, verifyStudent } = require('../middleware/auth');

const router = express.Router();

router.post('/companies/post', verifyCoordinator, addCompany);
router.get('/companies/get-companies', verifyStudentOrCoordinator, getCompanies);
router.get('/companies/get-company-by-id/:companyId', verifyStudentOrCoordinator, getCompanyById);
router.post('/companies/apply', verifyStudent, applyToCompany);
router.get('/companies/get-application-status', verifyStudent, getApplicationStatus);
router.get('/companies/get-applied-companies', verifyStudent, getAppliedCompanies);
router.get('/companies/get-applied-students', verifyCoordinator, allStudentsApplied);

module.exports = router;