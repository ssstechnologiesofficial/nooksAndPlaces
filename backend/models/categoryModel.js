const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  banner: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true  
});

module.exports = mongoose.model("Categories", categorySchema);
