const { verifyAuthToken } = require("../utils/authToken");
const User = require("../models/client/User");
const jwt = require("jsonwebtoken"); 

const protect = async (req, res, next) => {
  let token;
  console.log("🔍 Authorization Header:", req.headers.authorization);

  if (!req.headers.authorization) {
    console.log("⛔ No Authorization Header");
    return res.status(401).json({ message: "No authorization header provided" });
  }

  if (req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🛠 Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("⛔ User not found");
        return res.status(401).json({ message: "User not found" });
      }

      console.log("✅ User Role:", req.user.role); // ✅ Log user role
      next();
    } catch (error) {
      console.log("⛔ Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("⛔ Invalid Token Format");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Role-based authorization
const authorize = (roles) => (req, res, next) => {
  console.log("User Role:", req.user.role); 
  if (!roles.includes(req.user.role)) {
    console.log("⛔ Unauthorized Access");
    return res.status(403).json({ message: "Access denied, insufficient permissions" });
  }
  next();
};

// Permission-based check (for subadmins)
const checkPermission = (permission) => (req, res, next) => {
  if (req.user.role === 2 && !req.user.permissions.includes(permission)) {
    return res.status(403).json({ message: `Access denied for ${permission}` });
  }
  next();
};

module.exports = { protect, authorize, checkPermission };
