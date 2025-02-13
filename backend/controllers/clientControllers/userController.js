const User = require("../../models/client/User");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../../utils/authToken");

exports.registerUser = async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    name,
    contactNo,
    whatsappNo,
    email,
    companyId,
    gst,
    companyWebsite,
    password,
    role = 3, // Default role
    permissions = [], // Only applicable for subadmin
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Validate permissions for subadmin role
    if (role === 2 && !Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array for subadmin" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user (mongoose-sequence will handle userID automatically)
    const user = await User.create({
      name,
      contactNo,
      whatsappNo,
      email,
      companyId,
      gst,
      companyWebsite,
      password: hashedPassword, // Set the hashed password
      role,
      permissions: role === 2 ? permissions : undefined, // Only include permissions for subadmin
    });

    // Generate token
    const token = generateAuthToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        userID: user.userID, // `userID` is handled automatically by the plugin
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};



// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateAuthToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userID: user.userID,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.role === 2 ? user.permissions : undefined,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      id: user._id,
      userID: user.userID,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.role === 2 ? user.permissions : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    // Only allow admins and subadmins with the "view_users" permission
    if (req.user.role === 2 && !req.user.permissions.includes("view_users")) {
      return res.status(403).json({ message: "Access denied for viewing users" });
    }

    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    // Only allow admins and subadmins with the "edit_users" permission
    if (req.user.role === 2 && !req.user.permissions.includes("edit_users")) {
      return res.status(403).json({ message: "Access denied for editing users" });
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Only allow admins and subadmins with the "delete_users" permission
    if (req.user.role === 2 && !req.user.permissions.includes("delete_users")) {
      return res.status(403).json({ message: "Access denied for deleting users" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get Total User Count
exports.getTotalCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
