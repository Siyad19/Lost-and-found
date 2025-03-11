const express = require('express');
const router = express.Router();
const { getOrCreateChat, getUserChats } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Get or create chat between two users
router.post('/', authMiddleware, getOrCreateChat);

// Get all chats for the logged-in user
router.get('/', authMiddleware, getUserChats);

module.exports = router;
