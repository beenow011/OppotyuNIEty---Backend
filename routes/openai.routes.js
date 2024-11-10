const express = require('express');
const { uploadUserImage } = require('../middleware/multer.middleware');
const { extraxtInfoFromResume, checkEligibility } = require('../controllers/openai.controller');

const router = express.Router();


router.post('/openai/fillByResume', uploadUserImage, extraxtInfoFromResume)
router.post('/openai/check-eligibility', uploadUserImage, checkEligibility)




module.exports = router;
