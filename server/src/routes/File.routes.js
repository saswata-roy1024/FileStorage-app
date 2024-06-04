import express from "express"
import { Upload, fetchAll, toggeleStar } from "../controllers/File.controllers.js";

const router = express.Router()

router.post("/upload", Upload)

router.post('/:id/toggleStar', toggeleStar);

router.get("/all", fetchAll)

export default router;