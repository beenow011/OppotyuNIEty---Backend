const express = require('express');
const { extraxtInfoFromResume } = require('../controllers/gemini.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');

const router = express.Router();


router.post('/gemini/fillByResume', uploadUserImage, extraxtInfoFromResume)




module.exports = router;
