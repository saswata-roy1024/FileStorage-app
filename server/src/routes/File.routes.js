import express from "express"
import { Upload, fetchAll } from "../controllers/File.controllers.js";
import UploadFile from "../config/multer.config.js";

const router = express.Router()

router.post("/upload", UploadFile.single('file'), Upload)

router.get("/all", fetchAll)

export default router;