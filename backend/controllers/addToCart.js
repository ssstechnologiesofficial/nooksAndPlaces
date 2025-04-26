const mongoose = require('mongoose');
const Product = require('../models/Product');
const GuestCart = require('../models/guestCartSchema');


// Add product to cart for guest or registered user
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const guestToken = req.cookies.guest_token;  // Retrieve guest token from cookie
  
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
  
    try {
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (!guestToken) {
        return res.status(400).json({ message: 'No guest session found' });
      }
  
      let cart = await GuestCart.findOne({ guestToken });
  
      // If no cart exists for the guest, create a new one
      if (!cart) {
        cart = new GuestCart({
          guestToken,
          items: [],
        });
      }
  
      // Check if the product is already in the guest cart
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (existingProductIndex > -1) {
        // Product exists, update quantity
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add new product
        cart.items.push({ product: productId, quantity });
      }
  
      // Save the updated guest cart
      await cart.save();
  
      return res.status(200).json({
        message: 'Product added to guest cart',
        cart: cart.items,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };

// Get total quantity of products in guest cart
const getGuestCartQuantity = async (req, res) => {
  const guestToken = req.cookies.guest_token;

  if (!guestToken) {
    return res.status(400).json({ message: 'No guest session found' });
  }

  try {
    const cart = await GuestCart.findOne({ guestToken });

    if (!cart) {
      return res.status(200).json({ totalQuantity: 0 }); // Empty cart
    }

    const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return res.status(200).json({ totalQuantity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { addToCart, getGuestCartQuantity };

