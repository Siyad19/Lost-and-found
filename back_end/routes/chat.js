const express = require('express');
const router = express.Router();
const { getOrCreateChat, getUserChats, getChatById } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Get or create chat between two users
router.post('/', authMiddleware, getOrCreateChat);

// Get all chats for the logged-in user
router.get('/', authMiddleware, getUserChats);

// Get user info by id
router.get('/:id', authMiddleware, getChatById);


// ✅ Get all chats for logged-in user with last message
router.get("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Logged-in user's ID
  
      const chats = await Chat.find({ participants: userId }) // Fetch chats
        .populate("participants", "username") // Get user details
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 }, // Get last message
        });
  
      res.json(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
