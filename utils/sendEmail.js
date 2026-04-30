const nodemailer = require("nodemailer");


const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

  await transporter.sendMail({
    from: `"FeastForward" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  console.log("✅ Email sent");
};

module.exports = sendEmail;