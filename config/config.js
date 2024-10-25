require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    // JWT_KEY: process.env.JWT_KEY,
}