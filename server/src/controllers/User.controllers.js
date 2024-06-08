import User from '../models/user.models.js'
import { body, validationResult } from 'express-validator';
import otpModel from '../models/otp.models.js'
import mailer from '../config/nodemailer.config.js';
import bcrypt from 'bcrypt'

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
    const _id = req.session.passport.user;
    if (!_id) return res.status(401).send('Unauthorized');

    try {
        const user = await User.findOne({ _id });
        if (!user) return res.status(404).send('User not found');

        const otp = String(Math.floor(1000 + Math.random() * 9000));
        const HashedOtp = await bcrypt.hash(otp, 10);

        const oldOtp = await otpModel.findOne({ userId: _id });
        if (oldOtp) await otpModel.deleteOne({ userId: _id });

        await otpModel.create({
            otp: HashedOtp,
            userId: _id,
        });

        mailer(user.email, otp)
            .then(response => res.send('Otp sended Successfully'))
            .catch(error => res.status(500).send('Error sending email'));

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



export { fetchUser, updateUser, sendOtp, verifyEmail };


