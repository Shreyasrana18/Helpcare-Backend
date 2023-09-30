const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    return resetToken;
};

const sendResetPasswordEmail = (email, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            ssl : true,
            auth: {
                user: process.env.username,
                pass: process.env.password
            }
        });

        const mailOptions = {
            from: 'capstonehelpcare@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        console.log(resetToken);
    } catch (error) {
        console.error('Error creating transporter:', error);
    }
};

module.exports = { generateResetToken, sendResetPasswordEmail };