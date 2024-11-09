const express = require('express');
const { uploadUserImage } = require('../middleware/multer.middleware');
const { extraxtInfoFromResume } = require('../controllers/openai.controller');

const router = express.Router();


router.post('/openai/fillByResume', uploadUserImage, extraxtInfoFromResume)




module.exports = router;
