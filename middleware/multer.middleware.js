const multer = require('multer');

// Store the file data in memory for encryption
const storage = () => multer.memoryStorage();

// Expect multiple file uploads with the field name 'files'
// const uploadUserImages = multer({ storage: storage() }).array('files', 10); // Allow up to 10 files

// Expect a file upload with the field name 'file'


module.exports = { uploadUserImage: multer({ storage: storage() }).single('file') };
