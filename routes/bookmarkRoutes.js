const router = require('express').Router();
const Bookmark = require('../models/Bookmark');

// CREATE
router.post("/", async (req, res) => {
    try {
        const newBookmark = await Bookmark.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL
router.get("/", authMiddleware, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({
            user: req.user._id
        });

        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONE

// UPDATE

// DELETE