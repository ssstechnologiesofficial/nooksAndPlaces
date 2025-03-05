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

      req.user = await User.findById(decoded.email);

      if (!req.user) {
        console.log("⛔ User not found");
        return res.status(401).json({ message: "User not found" });
      }


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

const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // Store admin info in req object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { protect,verifyAdminToken  };
