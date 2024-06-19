import express from "express"
import { Upload, saveFile, fetchAll, fetchSingle, fetchSaves, toggeleStar, deleteFile, removeSaved } from "../controllers/File.controllers.js";

const router = express.Router()

router.post("/upload", Upload)
router.post('/save', saveFile);

router.post('/:id/toggleStar', toggeleStar);

router.post('/:id/delete', deleteFile);
router.delete('/remove', removeSaved);

router.get("/all", fetchAll);
router.get("/:id/single", fetchSingle);
router.get("/saves", fetchSaves);

export default router;