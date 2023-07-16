const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateResetToken, sendResetPasswordEmail } = require("../User/userfunctionController");


// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role
    });
    res.status(201).json(user);
});

// @desc Login user 
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not registered");
    }
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60m" } // Remember to change expiry time
        );
        res.status(200).json({ accessToken });
        res.json({ message: "User Logged In" });
    }
    else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
});

// @desc current user
// @route POST /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.status(201).json(req.user);
});

// change password
const changePassword = asyncHandler(async (req, res) => {
    if (req.body.userID != req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const filter = { _id: req.body.userID };
    const update = {
        $set: {
            password: hashedPassword,
        },
    };
    const options = { new: true };
    if (req.body.password != req.body.confirmpassword) {
        res.status(401);
        throw new Error('Password does not match');
    }
    const user = await User.findOneAndUpdate(filter, update, options);
    res.status(201).json(user);
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
    const resetToken = generateResetToken();
    const user = await User.findOne({ email: req.body.email });
    const resetTokenExpire = new Date();

    resetTokenExpire.setHours(resetTokenExpire.getHours() + 1);

    user.resetTokenExpire = resetTokenExpire;
    user.resetToken = resetToken;

    await user.save();
    sendResetPasswordEmail(user.email, resetToken);
    
    res.status(200).json({ message: 'Reset password email sent.' });
});


// reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({ resetToken });

    if (!user) {
        return res.status(400).json({ message: 'Invalid reset token.' });
    }
    if (user.resetTokenExpire < new Date()) {
        return res.status(400).json({ message: 'Reset token has expired.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
});

module.exports = { registerUser, loginUser, currentUser, changePassword, forgotPassword, resetPassword };