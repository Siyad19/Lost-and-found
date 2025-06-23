const express = require('express');
const router = express.Router();
const {
  addItem,
  getAllItems,
  getItemById,
  updateItemStatus,
  deleteItem,
  verifyReturn,

} = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const Item = require('../models/Item');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/User');
// const sendNotification = require("../utils/notifications");


// POST /api/items - Add new item
router.post('/', authMiddleware, addItem);

// GET /api/items - Get all items
router.get('/', getAllItems);

// Search Items by Title or Location
router.get('/search', async (req, res) => {
  try {
    const { title, location } = req.query;
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case insensitive
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' }; // Case insensitive
    }

    const items = await Item.find(query).populate('user', 'username');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/recently-found
// @route   GET /api/items/recently-found?userId=...
// @desc    Get recently found items based on user location
router.get("/recently-found", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = radius ? parseInt(radius) : 5000; // Default: 5km

    // Ensure the query only fetches items with valid coordinates
    const foundItems = await Item.find({
      status: "found",
      "location.coordinates": { $exists: true, $not: { $size: 0 } }, // Ensure coordinates exist
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: searchRadius // Distance in meters
        }
      }
    }).sort({ createdAt: -1 });

    res.status(200).json(foundItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/my-posts - Get posts uploaded by the logged-in user
router.get('/my-posts', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id; // depends on how your JWT is structured
    const items = await Item.find({ user: userId }).populate('user', 'username');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user items', details: err.message });
  }
});

// GET /api/items/latest - Latest 10 items
router.get('/latest', async (req, res) => {
  try {
    const items = await Item.find()
      .sort({ date: -1 })              // Sort by newest
      .limit(10)                       // Only latest 10
      .populate('user', 'username');  // Only show username

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET /api/items/:id - Get item by ID
router.get('/:id', getItemById);

// PUT /api/items/:id - Update item status
router.put('/:id', authMiddleware, updateItemStatus);

// DELETE /api/items/:id - Delete item
router.delete('/:id', authMiddleware, deleteItem);

// GET /api/items - Get all items
router.get('/', async (req, res) => {
  try {
    // Fetch all items and populate user details (only username)
    const items = await Item.find().populate('user', 'username');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/:id - Get item by ID
router.get('/:id', async (req, res) => {
  try {
    // Find item by ID and populate user details (only username)
    const item = await Item.findById(req.params.id).populate('user', 'username');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get item by category api/items?category=${category} 
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params

    let filter = {};
    if (category) {
      filter.category = category; // Filter items based on category
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT /api/items/:id - Update item status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.id);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if the logged-in user is the owner of the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Update item status
    item.status = req.body.status || item.status;

    // Save the updated item
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/items/:id - Delete item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.id);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if the logged-in user is the owner of the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the item
    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verifying item return using AI-based image matching
// POST /api/items/verify - Verify returned item with image matching

router.post('/verify-return', authMiddleware, verifyReturn);
// vision-api-siyad1911@durable-destiny-451005-s1.iam.gserviceaccount.com

// for notifications
// router.post("/mark-returned", async (req, res) => {
//   const { itemId, ownerId } = req.body;

//   if (!itemId || !ownerId) {
//     return res.status(400).json({ error: "Item ID and Owner ID are required" });
//   }

//   try {
//     const item = await Item.findById(itemId);
//     if (!item) return res.status(404).json({ error: "Item not found" });

//     // Mark item as returned
//     item.status = "returned";
//     await item.save();

//     // Get owner's device token
//     const owner = await User.findById(ownerId);
//     if (!owner || !owner.deviceToken) return res.json({ message: "Owner notified, but no device token found" });

//     // Send notification to the owner
//     sendNotification(owner.deviceToken, "Item Returned!", `Your item "${item.title}" has been returned!`);

//     res.json({ message: "Item marked as returned and owner notified" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating item status" });
//   }
// });

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.trim(); // Ensure clean input

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Fetch items matching the category (case-insensitive)
    const items = await Item.find({
      category: { $regex: new RegExp(category, "i") }
    });

    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// routes/items.js
router.get('/get/items/user/:userId', async (req, res) => {
  try {
    const items = await Item.find({ user: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user items' });
  }
});

// PUT /api/items/:id/toggle-return
router.put('/:id/toggle-return', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Toggle logic: returned ↔ original status
    if (item.status === 'returned') {
      // If it was returned, restore it to lost or found based on original type
      item.status = item.type === 'found' ? 'found' : 'lost'; // assumes you have a 'type' field
    } else {
      item.status = 'returned';
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







module.exports = router;
