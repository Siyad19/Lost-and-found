const Chat = require('../models/Chat');
const Message = require('../models/Message');
const mongoose = require('mongoose');

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ error: "Invalid chatId format" });
        }

        const message = new Message({
            chat: new mongoose.Types.ObjectId(chatId),
            sender: req.user.id,
            content
        });
        
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

// Get all messages in a chat
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId
    }).populate('sender', 'username');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages
};
