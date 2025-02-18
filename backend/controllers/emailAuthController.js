const transporter = require("../config/emailConfig");

const emailCodes = {}; // Store codes temporarily

// Generate a random 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send verification code to email
exports.sendCode = async (req, res) => {
  console.log(req.body)
  const { email } = req.body;
  const code = generateCode();
  emailCodes[email] = code; // Store the code temporarily

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login Code",
    text: `Your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Verification code sent!" });
  } catch (error) {
    res.json({ success: false, message: "Error sending email", error });
  }
};

// Verify the entered code
exports.verifyCode = (req, res) => {
  const { email, code } = req.body;
  if (emailCodes[email] && emailCodes[email] === code) {
    res.json({ success: true, message: "Verification successful!" });
  } else {
    res.json({ success: false, message: "Invalid code!" });
  }
};
