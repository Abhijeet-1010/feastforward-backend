const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"FeastForward" <no-reply@feastforward.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  console.log("✅ Mailtrap email sent");
};

module.exports = sendEmail;
