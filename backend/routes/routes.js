const express = require('express');
const multer = require('multer');

// Admin routes
const categoryController = require('../controllers/categoryController');
const { adminLogin } = require('../controllers/adminController');


// Client routes
const {  generateOTP, verifyOTP } = require("../controllers/clientControllers/authController");
const contactController = require("../controllers/contactController");
const { uploadProduct, uploadMiddleware, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');

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

module.exports = router;
