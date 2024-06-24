import User from '../models/user.models.js'
import { body, validationResult } from 'express-validator';
import otpModel from '../models/otp.models.js'
import mailer from '../config/nodemailer.config.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const fetchUser = async (req, res) => {
    const _id = req.session.passport.user;

    try {
        const user = await User.findOne({ _id });
        if (!user) return res.status(401).send('Unauthorized');

        res.status(200).json({
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            verified: user.verified
        })
    } catch (error) {
        console.log('Error:', error)
        res.status(500).send('Internal Server Error')
    }

}



const updateUser = [
    body('name')
        .trim()
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only English alphabet characters and spaces')
        .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .notEmpty().withMessage('Email is required'),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const _id = req.session.passport.user;
        if (!_id) return res.status(401).send('Unauthorized');

        try {
            const user = await User.findOne({ _id });
            if (!user) return res.status(404).send('User not found');

            user.name = req.body.name;
            user.email = req.body.email;
            const result = await user.save();

            res.status(200).json({
                name: result.name,
                email: result.email,
                profilePic: result.profilePic,
                verified: result.verified,
            });
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error')
        }
    }
];





const sendOtp = async (req, res) => {
    try {
        let user;
        if (req?.session?.passport?.user) {
            user = await User.findOne({ _id: req.session.passport.user });
            if (!user) return res.status(404).send('User not found');
        } else {
            user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(404).send('User not found');

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                maxAge: 30 * 60 * 1000
            });
        }

        const otp = String(Math.floor(1000 + Math.random() * 9000));
        const hashedOtp = await bcrypt.hash(otp, 10);

        const oldOtp = await otpModel.findOne({ userId: user._id });
        if (oldOtp) await otpModel.deleteOne({ userId: user._id });

        await otpModel.create({
            otp: hashedOtp,
            userId: user._id,
        });

        await mailer(user.email, otp);
        res.send('Otp sent successfully');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};



const verifyEmail = async (req, res) => {
    const _id = req.session.passport.user;
    try {
        const user = await User.findOne({ _id });
        if (!user) return res.status(404).send('User not found');

        user.verified = true;
        await user.save();
        return res.status(200).send('Account verified Successfully');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};



const changePassword = [
    body('newPassword')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*.?:]/).withMessage('Password must contain at least one special character from !@#$%^&*.?:')
        .not().matches(/[{}|<>()]/).withMessage('Password must not contain invalid characters {}|<>()')
        .notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const { newPassword, oldPassword } = req.body;

        const _id = req.session.passport.user;
        if (!_id) return res.status(401).send('Unauthorized');

        try {
            const user = await User.findOne({ _id });
            if (!user) return res.status(404).send('User not found');
            else if (!oldPassword) return res.status(400).send('Old Password required!');
            else if (!(bcrypt.compareSync(oldPassword, user.password))) return res.status(401).send('Invalid Credentials');

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            user.password = await bcrypt.hash(newPassword, 10);
            user.save();
            res.status(200).json({ msg: 'Success' });
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error')
        }
    }
];




const resetPassword = [
    body('newPassword')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*.?:]/).withMessage('Password must contain at least one special character from !@#$%^&*.?:')
        .not().matches(/[{}|<>()]/).withMessage('Password must not contain invalid characters {}|<>()')
        .notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const { newPassword } = req.body;
        let _id;

        if (req?.session?.passport?.user) {
            _id = req.session.passport.user;
        } else {
            const token = req.cookies.jwt;
            if (!token) return res.status(401).send('Unauthorized: No token provided');

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                _id = decoded._id;
            } catch (error) {
                console.log('JWT Error:', error);
                return res.status(400).send('Invalid token');
            }
        }

        if (!_id) return res.status(401).send('Unauthorized');
        try {
            const user = await User.findOne({ _id });
            if (!user) return res.status(404).send('User not found');

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            user.password = await bcrypt.hash(newPassword, 10);
            user.save();
            res.status(200).send('Success');
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error')
        }
    }
];



export { fetchUser, updateUser, sendOtp, verifyEmail, changePassword, resetPassword };


