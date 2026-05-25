// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const passport = require('passport');

const userRouter = require('./routes/userRoutes');
const bookmarkRouter = require('./routes/bookmarkRoutes');
const authMiddleware = require('./utils/auth');

require('./config/passport');

const PORT = process.env.PORT;

// MIDDLEWARE

// ROUTES
// app.get('/test', (req, res) => {
//     res.send("Testing..") <-- Test Route
// })

// PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});