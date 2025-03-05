const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  addresses: [
    {
      country: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      pin: String,
      mobile: String,
      default: Boolean,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserModel', userSchema);
