// encryption/encryptionUtils.js
const crypto = require('crypto');

const encryptFile = (fileBuffer, encryptionKey) => {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // // Create a cipher object with AES-256-CBC algorithm and the provided encryption key and IV
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    //     AES-256-CBC:

    // AES (Advanced Encryption Standard) is a symmetric encryption algorithm.
    // "256" refers to the size of the encryption key in bits (32 bytes).
    // CBC (Cipher Block Chaining) mode ensures that each block of plaintext is XORed with the previous block of ciphertext, adding security.

    // Encrypt the file data
    const encryptedData = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

    // Return the encrypted data and initialization vector
    return { encryptedData, iv };
};

module.exports = {
    encryptFile,
};