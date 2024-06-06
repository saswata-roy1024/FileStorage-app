import { Router } from "express";
import { fetchUser } from "../controllers/User.controllers.js";

const router = Router()

router.get("/profile", fetchUser)


export default router;