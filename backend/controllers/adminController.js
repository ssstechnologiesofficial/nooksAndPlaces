require("dotenv").config();
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🛠 Attempting login for email:", email);

    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("⛔ Admin not found for email:", email);
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    console.log("✅ Admin found:", admin);

    // Check if password matches (Since it's plain text)
    if (password !== admin.password) {
      console.log("⛔ Invalid password for email:", email);
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    console.log("🔓 Password matched");

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful");
    res.json({
      message: "Login successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("🔥 Server error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
