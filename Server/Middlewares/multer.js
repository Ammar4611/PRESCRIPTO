import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // if using ES modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // path.join makes sure it's always correct regardless of OS
   cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // keep original extension
  }
});

const upload = multer({ storage });

export default upload;
