import express from 'express';
import { SignUp, SignIn, LogOut } from '../controllers/Auth.controllers.js';
import { validateUser, handleValidationErrors } from "../middlewares/validator.js";

const router = express.Router();

router.post("/signup", validateUser, handleValidationErrors, SignUp);
router.post("/signin", SignIn);
router.get("/logout", LogOut);


export default router;