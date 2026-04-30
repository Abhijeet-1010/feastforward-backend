const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const otpStore = {}; // temporary storage

// register user
const registerUser = async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // 👈 ADD THIS

    const user = new User(req.body);
    const savedUser = await user.save();

    console.log("Saved user:", savedUser); // 👈 ADD THIS

    res.status(201).json(savedUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" });
    res.json({ volunteers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    await sendEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const verifyOtpAndRegister = async (req, res) => {
  try {
    const { name, email, password, role, location, otp } = req.body;

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = new User({ name, email, password, role, location });

    await user.save();

    delete otpStore[email];

    res.json({ message: "User registered successfully", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getVolunteers, sendOtp, verifyOtpAndRegister };