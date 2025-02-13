const connectDB = require('./config/db');  
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/client/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Use the central database connection
    await connectDB();

    // Check if Admin exists
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (admin) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 1,
          });

      await newAdmin.save();
      console.log('Admin has been created');
    }

    // Disconnect from DB if needed (optional, especially if using central connection)
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

seedAdmin();
