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

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

// MIDDLEWARE
app.use(express.json());
app.use(passport.initialize());

// ROUTES
app.get('/', (req, res) => {
    res.send("API running...")
})

app.use('/api/users', userRouter);
app.use('/api/bookmarks', bookmarkRouter);

// PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});