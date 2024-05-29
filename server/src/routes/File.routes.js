import express from "express"
import { Upload, fetchAll } from "../controllers/File.controllers.js";

const router = express.Router()

router.post("/upload", Upload)

router.get("/all", fetchAll)

export default router;