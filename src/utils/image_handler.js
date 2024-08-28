// src/middleware/multerConfig.js
import multer from 'multer';
import path from 'path';

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Naming the file with timestamp
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

export default upload;
