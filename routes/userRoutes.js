const express = require("express");
const router = express.Router();

const { registerUser, loginUser , getVolunteers ,sendOtp , verifyOtpAndRegister } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/volunteers", getVolunteers);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);

module.exports = router;