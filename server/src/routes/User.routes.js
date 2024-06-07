import { Router } from "express";
import { fetchUser, updateUser } from "../controllers/User.controllers.js";

const router = Router()

router.get("/profile", fetchUser)
router.put("/profile", updateUser)


export default router;