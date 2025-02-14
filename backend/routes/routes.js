const express = require('express');
const multer = require('multer');
// const {protect} =require('../middleware/authMiddleware');

// Admin routes
const categoryController = require('../controllers/categoryController');
const { adminLogin } = require('../controllers/adminController');

// Client routes
const userController = require('../controllers/clientControllers/userController');
const contactController = require("../controllers/contactController");

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

//Routes for Signin,login
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getProfile);



//Contact Routes
router.post("/createContact", contactController.createContact);
router.get("/getContacts", contactController.getContacts);
router.get("/getContactById/:id", contactController.getContactById);
router.put("/updateContact/:id", contactController.updateContact);
router.delete("/deleteContact/:id", contactController.deleteContact);



module.exports = router;
