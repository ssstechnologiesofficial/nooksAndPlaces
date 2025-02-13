require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const courseRoutes = require('./routes/routes')
const connectDB = require('./config/db')

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
];

// CORS middleware with the added authorization header
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
      }
    },
    credentials: true, 
    methods: ['GET', 'POST','PUT',"DELETE"], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'))
app.use('/api', courseRoutes)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err))
