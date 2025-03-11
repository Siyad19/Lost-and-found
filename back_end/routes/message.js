const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Send a message in a chat
router.post('/', authMiddleware, sendMessage);

// Get all messages in a chat
router.get('/:chatId', authMiddleware, getMessages);

module.exports = router;
