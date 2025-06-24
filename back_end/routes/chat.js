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

    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'username')
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } }, // ✅ Ensure latest message comes first
      })

    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
