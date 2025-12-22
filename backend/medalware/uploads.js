
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads",
    resource_type: "raw",          // 🔥 IMPORTANT
    public_id: file.originalname,  // 🔥 KEEP ORIGINAL NAME
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, 
  },
});

export default upload;
