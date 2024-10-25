const express = require('express');
// const { authController } = require('../controllers/auth.controller');
const { coordinatorAuth } = require('../controllers/coorodinators.auth.controller');
const { unapproved } = require('../controllers/unapproved.auth');
const router = express.Router();

router.post('/coordinator-auth/create-account', coordinatorAuth)
router.get('/coordinator-auth/unapproved', unapproved)

module.exports = router;