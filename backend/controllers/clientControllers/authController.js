require('dotenv').config();
const nodemailer = require('nodemailer');
const UserModel = require('../../models/client/UserModel');

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD  // Your email password or app password
  }
});

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otp = generateOTP(); // Generate OTP

    // Save OTP in database
    await UserModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    console.log(`Generated OTP for ${email}: ${otp}`);

    // **✅ Send OTP via email**
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send OTP email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
      }
    });
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
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

