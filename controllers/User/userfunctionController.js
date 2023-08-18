const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    return resetToken;
};

const sendResetPasswordEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
            user: process.env.username,
            pass: process.env.password
        }
    });

    const mailOptions = {
        from: 'capstonehelpcare@yahoo.com',
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
};

module.exports = { generateResetToken, sendResetPasswordEmail };