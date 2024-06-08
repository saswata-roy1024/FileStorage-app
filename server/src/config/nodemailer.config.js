import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();


const mailer = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_NODEMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'Verify your email',
        html: `<h2>Your one time password is: ${otp}</h2><p>expires in 10 minutes</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log(`Email sent: ${info.response}`);
            resolve(info);
        }
    });

}

export default mailer;