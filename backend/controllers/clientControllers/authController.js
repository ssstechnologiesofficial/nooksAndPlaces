require('dotenv').config();
const nodemailer = require('nodemailer');
const UserModel = require('../../models/client/otpModel');
const jwt = require("jsonwebtoken");
// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Use App Password instead of the actual password
    pass: process.env.PASSWORD
  }
});

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Function to generate an expiration time (5 minutes from now)
const otpExpiry = () => new Date(Date.now() + 5 * 60 * 1000);

exports.generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otp = generateOTP(); // Generate OTP
    const expiresAt = otpExpiry(); // Set expiry time

    // Save OTP in database with an expiration time
    await UserModel.findOneAndUpdate(
      { email },
      { otp, otpExpiresAt: expiresAt }, // Store OTP with expiration
      { upsert: true, new: true }
    );

    console.log(`Generated OTP for ${email}: ${otp}`);

    // **✅ Send OTP via email (using async/await)**
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });

    const otpRecord = await UserModel.findOne({ email, otp });

    if (!otpRecord)
      return res.status(400).json({ success: false, message: 'Invalid OTP' });

    if (otpRecord.otpExpiresAt < new Date())
      return res.status(400).json({ success: false, message: 'OTP has expired' });

    // **✅ Generate JWT Token**
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({ success: true, message: 'OTP verified successfully', token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};