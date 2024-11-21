const express = require('express');
const { uploadUserImage } = require('../middleware/multer.middleware');
const { extraxtInfoFromResume, checkEligibility, answerTheQuestion } = require('../controllers/openai.controller');

const router = express.Router();


router.post('/openai/fillByResume', uploadUserImage, extraxtInfoFromResume)
router.post('/openai/check-eligibility', uploadUserImage, checkEligibility)
router.post('/openai/get-answer', answerTheQuestion)




module.exports = router;
