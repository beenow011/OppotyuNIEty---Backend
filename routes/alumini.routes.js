const express = require('express');
const { aluminiSignup } = require('../controllers/alumini.controller');
const router = express.Router();

router.post('/alumini/sign-up', aluminiSignup)

module.exports = router;