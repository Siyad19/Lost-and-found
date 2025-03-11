const Item = require('../models/Item');
const matchImages = require('../utils/imageMatching');
const admin = require("../config/firebase");
const User = require("../models/User");

// Helper function: Check if user owns the item
const checkOwnership = (item, userId) => {
  if (item.user.toString() !== userId) {
    throw new Error("Unauthorized: You do not have permission to modify this item.");
  }
};

// Add new item
const addItem = async (req, res) => {
  try {
    const { title, description, location, latitude, longitude, imageUrl, status, category } = req.body;

    // Ensure category is provided
    if (!category || category.trim() === "") {
      return res.status(400).json({ error: "Category is required. Please provide a valid category." });
    }

    const newItem = new Item({
      title,
      description,
      location,
      latitude,
      longitude,
      imageUrl: imageUrl || '',
      status: status || 'lost',
      category, // Manual category (required)
      user: req.user.id
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'username');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'username');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item status
const updateItemStatus = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Check if user is the owner
    checkOwnership(item, req.user.id);

    item.status = req.body.status || item.status;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(err.message.includes("Unauthorized") ? 401 : 500).json({ error: err.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Check if user is the owner
    checkOwnership(item, req.user.id);

    await item.deleteOne();
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(err.message.includes("Unauthorized") ? 401 : 500).json({ error: err.message });
  }
};

// Verify return
const verifyReturn = async (req, res) => {
  const { itemId, imageUrl1, imageUrl2 } = req.body;
  const userId = req.user.id;

  try {
    const item = await Item.findById(itemId).populate("user");
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Check if user is the owner of the lost item
    checkOwnership(item, userId);

    // AI Image Matching
    const isMatch = await matchImages(imageUrl1, imageUrl2);
    if (!isMatch) {
      return res.json({ success: false, message: "Images did not match." });
    }

    // Update status
    item.status = "returned";
    await item.save();

    // Fetch owner's FCM token
    const owner = await User.findById(item.user._id).select("fcmToken");
    if (!owner?.fcmToken) {
      return res.json({ message: "Item returned, but no notification sent (FCM token missing)." });
    }

    // Send push notification
    const message = {
      token: owner.fcmToken,
      notification: {
        title: "Item Returned 🎉",
        body: `Your lost item "${item.title}" has been verified and returned!`,
      },
      data: {
        itemId: item._id.toString(),
        status: "returned",
      },
    };

    await admin.messaging().send(message);
    res.json({ success: true, message: "Item verified and returned! Owner has been notified." });

  } catch (error) {
    console.error("Error in verifyReturn:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItemStatus,
  deleteItem,
  verifyReturn,
};
