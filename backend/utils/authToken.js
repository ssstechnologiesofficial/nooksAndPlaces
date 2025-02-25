const jwt = require("jsonwebtoken");

const generateAuthToken = (email) => {
  console.log("🔑 Generating Token for ID:", email);
  if (!process.env.JWT_SECRET) {
    console.error("⛔ JWT_SECRET is missing in .env file!");
  }

  return jwt.sign({ email}, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateAuthToken, verifyAuthToken };
