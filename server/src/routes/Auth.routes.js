import express from 'express';
import { SignUp, SignIn, LogOut } from '../controllers/Auth.controllers.js';

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", LogOut);


export default router;