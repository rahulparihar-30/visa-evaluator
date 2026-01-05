import mongoose from "mongoose";
import multer from "multer";

const localStorage = multer.memoryStorage();

const upload = multer({
  storage: localStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"), false);
    }
    cb(null, true);
  },
});

export default upload;