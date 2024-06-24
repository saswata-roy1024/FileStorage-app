import otpModel from '../models/otp.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const verifyOtp = async (req, res, next) => {
    let _id;
    if (req.session?.passport?.user) {
        _id = req.session.passport.user;
    } else {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).send('Unauthorized: No token provided');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            _id = decoded._id;
            console.log(decoded)
        } catch (error) {
            console.log('JWT Error:', error);
            return res.status(400).send('Invalid token');
        }
    }

    const { otp } = req.body;
    if (!otp) return res.status(400).send('OTP is required');

    try {
        const otpRecord = await otpModel.findOne({ userId: _id });

        if (!otpRecord) return res.status(404).send('OTP not found');

        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) return res.status(400).send('Invalid OTP');

        next();
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default verifyOtp