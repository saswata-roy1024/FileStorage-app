import User from '../models/user.models.js'
import { body, validationResult } from 'express-validator';

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


export { fetchUser, updateUser };

