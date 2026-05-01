const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_USER, // verified sender
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  await sgMail.send(msg);
  console.log("✅ Email sent via SendGrid");
};

module.exports = sendEmail;