import otpModel from '../models/otp.models.js'
import bcrypt from 'bcrypt'


const verifyOtp = async (req, res, next) => {
    const _id = req.session.passport.user;
    if (!_id) return res.status(401).send('Unauthorized');

    const { otp } = req.body;
    if (!otp) return res.status(400).send('Bad Request');

    try {
        const otpRecord = await otpModel.findOne({ userId: _id });

        if (!otpRecord) return res.status(404).send('OTP not found');

        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) return res.status(400).send('Invalid OTP');

        next()
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default verifyOtp