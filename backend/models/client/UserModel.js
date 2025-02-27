const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String},
    otp: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 300 },
});

module.exports = mongoose.model("UserModel", userSchema);
