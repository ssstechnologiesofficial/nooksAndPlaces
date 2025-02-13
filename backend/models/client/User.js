const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./counterModel"); // Import Counter model

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: Number,
      unique: true, // Ensures uniqueness
    },
    name: { type: String, required: true },
    contactNo: { type: Number },
    whatsappNo: { type: Number },
    email: { type: String },
    companyId: { type: String },
    gst: { type: String },
    companyWebsite: { type: String },
    password: { type: String },
    role: { type: Number, enum: [1, 2, 3], default: 3, required: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Pre-save middleware to auto-increment userID
userSchema.pre("save", async function (next) {
  if (!this.userID) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userID" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Create if not exists
      );
      this.userID = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
