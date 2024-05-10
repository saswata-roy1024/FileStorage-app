import express from "express"
import { Upload } from "../controllers/File.controllers.js";
import UploadFile from "../config/multer.config.js";

const router = express.Router()

router.post("/upload", UploadFile.single('file'), Upload)

export default router;