require('dotenv').config();
// CLOUDINARY_CLOUD_NAME = dv1i5yy8m
// CLOUDINARY_API_KEY =846848816468992
// CLOUDINARY_API_SECRET = sY3y1ezJK-iezfLsf4p4H6MJcUo

module.exports = {
    port: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,

    JWT_KEY: process.env.JWT_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECID: process.env.FIREBASE_PROJECID,
    FIREBASE_BUCKET: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.messagingSenderId,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    measurementId: process.env.measurementId,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

}