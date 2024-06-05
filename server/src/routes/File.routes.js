import express from "express"
import { Upload, fetchAll, toggeleStar, deleteFile } from "../controllers/File.controllers.js";

const router = express.Router()

router.post("/upload", Upload)

router.post('/:id/toggleStar', toggeleStar);

router.post('/:id/delete', deleteFile);

router.get("/all", fetchAll)

export default router;