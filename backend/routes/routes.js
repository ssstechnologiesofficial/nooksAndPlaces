const express = require('express');
const multer = require('multer');
const userController = require("../controllers/clientControllers/userController");

// Admin routes
const categoryController = require('../controllers/categoryController');
const { adminLogin } = require('../controllers/adminController');


// Client routes
const {  generateOTP, verifyOTP } = require("../controllers/clientControllers/authController");
const contactController = require("../controllers/contactController");
const { uploadProduct, uploadMiddleware, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const { createGuestSession } = require('../controllers/createsession');
const { addToCart, getGuestCartQuantity } = require('../controllers/addToCart');
const { toggleWishlist, getWishlist } = require('../controllers/toggleWishlist');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Categories Routes
router.get("/getCategories", categoryController.getCategories);
router.post("/addCategory", upload.single("banner"), categoryController.addCategory);
router.put("/updateCategory/:id", upload.single("banner"), categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);
router.get("/getTotalCategories/total", categoryController.getTotalCategories);

// Routes for Admin Login
router.post('/loginAdmin', adminLogin);
router.post('/uploadProduct', uploadMiddleware , uploadProduct);
router.get('/getproducts', getAllProducts);
router.get("/getproduct/:id", getProductById);
router.put("/updateProduct/:id", updateProduct);  // Edit product
router.delete("/deleteProduct/:id", deleteProduct); // Delete product


//Contact Routes
router.post("/createContact", contactController.createContact);
router.get("/getContacts", contactController.getContacts);
router.get("/getContactById/:id", contactController.getContactById);
router.put("/updateContact/:id", contactController.updateContact);
router.delete("/deleteContact/:id", contactController.deleteContact);

//otp routes
router.post("/generate-otp", generateOTP);
router.post("/verify-otp", verifyOTP);

// User Routes
router.post("/register", userController.registerUser);
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.delete("/user/:id", userController.deleteUser);

// Address Routes
router.post("/user/:id/address", userController.addAddress);
router.put("/user/:userId/address/:addressId", userController.updateAddress);
router.delete("/user/:userId/address/:addressId", userController.deleteAddress);

// session 
router.get("/create-session", createGuestSession);
// add to cart 
router.post('/add-to-cart', addToCart);
router.get('/cart-quantity', getGuestCartQuantity);
router.post('/wishlist', toggleWishlist);
router.get('/get-wishlist', getWishlist);
module.exports = router;
