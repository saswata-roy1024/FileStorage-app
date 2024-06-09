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
        subject: 'Your One-Time Password (OTP) for Secure Access',
        subject: 'Your One-Time Password (OTP) for Secure Access',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Dear User,</h2>
        <p>We hope this email finds you well.</p>
        <p>As part of our commitment to keeping your account secure, we have generated a One-Time Password (OTP) for you. Please use the OTP below to complete your authentication process.</p>
        <div style="text-align: center; margin: 20px 0;">
          <h3 style="background: #f7f7f7; padding: 10px 20px; display: inline-block; border: 1px solid #ddd; border-radius: 5px;">
            Your OTP is: <strong>${otp}</strong>
          </h3>
        </div>
        <p>This OTP is valid for the next 30 minutes. For your security, do not share this code with anyone. If you did not request this code, please contact our support team immediately.</p>
        <p>If you encounter any issues or need further assistance, please do not hesitate to reach out to our support team at <a href="mailto:support@filestorage.com">support@filestorage.com</a> or call us at (123) 456-7890.</p>
        <p>Thank you for choosing Our Company.</p>
        <p>Best regards,</p>
        <p style="font-weight: bold;">John Doe<br>Support bot<br>File Storage<br><a href="mailto:filestorage@gmail.com">filestorage@gmail.com</a><br><a href="http://www.filestorage.com" target="_blank">www.filestorage.com</a></p>
      </div> `,
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