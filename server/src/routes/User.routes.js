import { Router } from "express";
import { fetchUser, updateUser, sendOtp,  verifyOtp} from "../controllers/User.controllers.js";

const router = Router()

router.get("/profile", fetchUser)
router.put("/profile", updateUser)
router.get("/verify", sendOtp)
router.post("/verify", verifyOtp)


export default router;