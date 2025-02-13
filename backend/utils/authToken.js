const jwt = require("jsonwebtoken");

const generateAuthToken = (id, role) => {
  console.log("🔑 Generating Token for ID:", id, "Role:", role);
  if (!process.env.JWT_SECRET) {
    console.error("⛔ JWT_SECRET is missing in .env file!");
  }

  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateAuthToken, verifyAuthToken };
