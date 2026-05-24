const userRouter = require('express').Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

userRouter.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // CHECK IF USER EXISTS
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "A user with this email already exists."
            });
        }

        // CREATE NEW USER
        const user = await User.create(req.body);

        // SUCCESS RESPONSE
        res.status(201).json({
            githubId: user.githubId,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // CHECK FOR USER IN DATABASE
        if (!user) {
            return res.status(400).json({
                error: "Incorrect email or password."
            });
        }

        // PASSWORD CHECK
        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
            return res.status(400).json({
                error: "Incorrect email or password."
            });
        }

        // PAYLOAD
        const payload = {
            _id: user._id,
            githubId: user.githubId,
        };

        // CREATE TOKEN
        const token = jwt.sign(payload, secret, { expiresIn: "2h" });

        res.json({
            token,
            user: {
                _id: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;