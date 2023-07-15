const express = require("express");
const { registerUser, loginUser, currentUser, changePassword } = require("../controllers/User/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.post("/changepassword", validateToken, changePassword);

module.exports = router; 