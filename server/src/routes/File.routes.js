import express from "express"
import { Upload, saveFile, fetchAll, fetchSingle, toggeleStar, deleteFile } from "../controllers/File.controllers.js";

const router = express.Router()

router.post("/upload", Upload)
router.post('/save', saveFile);

router.post('/:id/toggleStar', toggeleStar);

router.post('/:id/delete', deleteFile);

router.get("/all", fetchAll);
router.get("/:id/single", fetchSingle);

export default router;