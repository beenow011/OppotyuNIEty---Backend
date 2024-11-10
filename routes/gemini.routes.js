const express = require('express');
const { extraxtInfoFromResume, checkEligibility } = require('../controllers/gemini.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');

const router = express.Router();


router.post('/gemini/check-eligibility', uploadUserImage, checkEligibility)




module.exports = router;
