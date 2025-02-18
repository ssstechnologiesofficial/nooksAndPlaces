const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadProduct = async (req, res) => {
  try {
    const { productName, mrp, sellingPrice, description } = req.body;
    const images = req.files['images'] ? req.files['images'].map((file) => file.path) : [];



    const newProduct = new Product({
      productName,
      mrp,
      sellingPrice,
      description,
      images,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadMiddleware = upload.fields([
  // { name: 'img', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);

module.exports = { uploadMiddleware, uploadProduct };
