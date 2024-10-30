const express = require('express');
// const { authController } = require('../controllers/auth.controller');
const { coordinatorAuth, unapproved, getStatus, approveCoordinator, dissApproveStatus, login } = require('../controllers/coorodinators.auth.controller');
// const { unapproved } = require('../controllers/unapproved.auth');
const router = express.Router();

router.post('/coordinator-auth/create-account', coordinatorAuth)
router.get('/coordinator-auth/unapproved', unapproved)
router.get('/coordinator-auth/get-status', getStatus)
router.post('/coordinator-auth/approve-status', approveCoordinator)
router.post('/coordinator-auth/dissapprove-status', dissApproveStatus)
router.post('/coordinator-auth/login-user', login)

module.exports = router;