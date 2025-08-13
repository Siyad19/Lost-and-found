const express = require("express");
const User = require("../models/User");
const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add item
router.post("/:itemId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedItems.includes(req.params.itemId)) {
      user.savedItems.push(req.params.itemId);
      await user.save();
    }
    res.json({ message: "Item saved successfully", savedItems: user.savedItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item
router.delete("/:itemId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedItems = user.savedItems.filter(
      (id) => id.toString() !== req.params.itemId
    );
    await user.save();
    res.json({ message: "Item removed successfully", savedItems: user.savedItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get saved items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedItems");
    res.json(user.savedItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle save/unsave
router.post("/:itemId/toggle", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const index = user.savedItems.findIndex(
      (id) => id.toString() === req.params.itemId
    );

    if (index === -1) {
      user.savedItems.push(req.params.itemId);
      await user.save();
      return res.json({ saved: true, message: "Item saved" });
    } else {
      user.savedItems.splice(index, 1);
      await user.save();
      return res.json({ saved: false, message: "Item unsaved" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ CommonJS export
