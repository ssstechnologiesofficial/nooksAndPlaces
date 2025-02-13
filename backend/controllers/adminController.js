const User = require('../models/client/User');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../utils/authToken');


exports.adminLogin = async (req, res) => {
  try {
    console.log("🔍 Login Request Received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "❌ Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "❌ Invalid credentials" });
    }

    if (![1, 2].includes(user.role)) {
      return res.status(403).json({ message: "❌ Access denied. Only Admin and Subadmin allowed." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "❌ Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = generateAuthToken(user._id, user.role);
    console.log("✅ Generated Token:", token);

    return res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,  // ✅ Token should be returned properly
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    return res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
};


// controllers/adminController.js
exports.createSubAdmin = async (req, res) => {
  const { name, email, password, contactNo, permissions } = req.body;
  console.log('Sub-admin creation request received:', req.body);

  try {
    // Ensure the user is an admin
    if (req.user.role !== 1) {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }

    // Check if email or contact number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { contactNo }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email or contact number already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubAdmin = new User({
      name,
      email,
      password: hashedPassword,
      contactNo,
      role: 2, // Subadmin role
      permissions: permissions || [], // Permissions for subadmin
    });

    await newSubAdmin.save();

    res.status(201).json({
      message: 'Subadmin created successfully',
      subAdmin: { name, email, permissions },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
