import { Router } from "express";
import { fetchUser, updateUser, sendOtp,  verifyEmail} from "../controllers/User.controllers.js";
import  verifyOtp  from "../middlewares/verifyOtp.middlewares.js";

const router = Router()

router.get("/profile", fetchUser)
router.put("/profile", updateUser)
router.get("/verify", sendOtp)

router.post("/verify", verifyOtp, verifyEmail)


export default router;