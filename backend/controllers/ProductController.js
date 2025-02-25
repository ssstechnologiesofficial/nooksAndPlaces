const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Set up multer storage for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Controller to upload a new product
const uploadProduct = async (req, res) => {
  try {
    const { productName, mrp, sellingPrice, description, addToCart, wishlist, availability, size, vendor, productType } = req.body;

    // Ensure 'size' is parsed as an array (if it's passed as a string)
    const parsedSize = Array.isArray(size) ? size : size.split(',');

    // Process image files
    const images = req.files['images'] ? req.files['images'].map((file) => file.path) : [];

    const newProduct = new Product({
      productName,
      mrp,
      sellingPrice,
      description,
      addToCart: addToCart || false,  // Default to false if not provided
      wishlist: wishlist || false,    // Default to false if not provided
      availability: availability || true,  // Default to true if not provided
      size: parsedSize,  // Make sure the size is in array format
      vendor,
      productType,
      images,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Middleware for handling file uploads
const uploadMiddleware = upload.fields([
  { name: 'images', maxCount: 10 }, // Allow up to 10 images to be uploaded
]);


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};


module.exports = { uploadMiddleware, uploadProduct , getAllProducts, getProductById};
