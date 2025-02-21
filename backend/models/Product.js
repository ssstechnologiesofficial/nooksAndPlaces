const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    addToCart: { type: Boolean, default: false }, // New field to indicate if the product is added to the cart
    wishlist: { type: Boolean, default: false },   // New field for wishlist status
    availability: { type: Boolean, default: true }, // New field to track product availability
    size: { type: [String], default: [] },         // New field to store available sizes
    vendor: { type: String, required: true },      // New field for the vendor name
    productType: { type: String }, // New field for the product type
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
