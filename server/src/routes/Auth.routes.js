import express from 'express';
import { SignUp, SignIn, GoogleCallback, Failure, IsAuthenticated, LogOut } from '../controllers/Auth.controllers.js';
import { validateUser, handleValidationErrors } from "../middlewares/validator.js";
import '../config/Passport-local.js'
import '../config/Passport-google.js'
import passport from 'passport'

const router = express.Router();

router.post("/signup", validateUser, handleValidationErrors, passport.authenticate('local-signup'), SignUp);
router.post("/signin", passport.authenticate('local-signin'), SignIn);


router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }), GoogleCallback);
router.get('/failure', Failure)

router.get('/isAuthenticated', IsAuthenticated)

router.get("/logout", LogOut);


export default router;