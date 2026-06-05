import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pastikan folder 'uploads' ada di root backend
  },
  filename: (req, file, cb) => {
    // Penamaan unik agar tidak tertimpa
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
