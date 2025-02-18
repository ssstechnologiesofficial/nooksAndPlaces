const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    // img: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
