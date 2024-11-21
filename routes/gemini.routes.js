const express = require('express');
const { extraxtInfoFromResume, checkEligibility, answerTheQuestion } = require('../controllers/gemini.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');

const router = express.Router();


router.post('/gemini/check-eligibility', uploadUserImage, checkEligibility)
router.post('/gemini/get-answer', answerTheQuestion)




module.exports = router;
