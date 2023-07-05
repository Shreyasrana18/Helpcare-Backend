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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);