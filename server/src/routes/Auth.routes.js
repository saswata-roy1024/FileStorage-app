import express from 'express';
import { SignUp, SignIn, LogOut } from '../controllers/Auth.controllers.js';
import { validateUser, handleValidationErrors } from "../middlewares/validator.js";
import '../config/Passport-local.js'
import passport from 'passport'

const router = express.Router();

router.post("/signup", validateUser, handleValidationErrors, passport.authenticate('local-signup'), SignUp);
router.post("/signin", passport.authenticate('local-signin'), SignIn);
router.get("/logout", LogOut);


export default router;