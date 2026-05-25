const router = require('express').Router();
const authMiddleware = require('../utils/auth');
const Bookmark = require('../models/Bookmark');

// CREATE
router.post("/", authMiddleware, async (req, res) => {
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
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!bookmark) {
            return res.status(404).json({
                message: "Bookmark not found."
            });
        }

        res.json(bookmark);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedBookmark = await Bookmark.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            {
                new: true
            }
        );

        if (!updatedBookmark) {
            return res.status(404).json({ message: "Bookmark not found." });
        }

        res.json(updatedBookmark);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.user._id
            }
        );

        if (!deletedBookmark) {
            return res.status(404).json({
                message: "Bookmark not found."
            });
        }

        res.json({
            message: "Bookmark deleted successfully."
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;