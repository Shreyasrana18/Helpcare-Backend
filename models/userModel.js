const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please add the username"],
        },
        email: {
            type: String,
            required: [true, "please add the email address"],
            unique: [true, "Email already exists"],
        },
        password: {
            type: String,
            required: [true, "please add the password"],
        },
        role: {
            type: String,
            enum: ['patient', 'admin','diagnostic'],
            default: 'patient',
            required: [true, "please add the role"],
        },
        resetToken: {
            type: String,
        },
        resetTokenExpire: {
            type: Date,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);