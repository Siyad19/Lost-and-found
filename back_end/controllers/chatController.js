const Chat = require('../models/Chat');
const Message = require('../models/Message');
const mongoose = require('mongoose');


// Create or Get Chat between two users
const getOrCreateChat = async (req, res) => {
    const { userId } = req.body;
  
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
  
    try {
      let chat = await Chat.findOne({
        participants: {
          $all: [
            new mongoose.Types.ObjectId(req.user.id), 
            new mongoose.Types.ObjectId(userId)
          ]
        }
      });
  
      // If no chat exists, create a new one
      if (!chat) {
        chat = new Chat({
          participants: [req.user.id, userId]
        });
        await chat.save();
      }
  
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get all chats for the logged-in user
const getUserChats = async (req, res) => {
  try {
      const chats = await Chat.find({ participants: req.user.id })
          .populate('participants', 'username');

      // Exclude the logged-in user from participants
      const formattedChats = chats.map(chat => {
          const otherUser = chat.participants.find(p => p._id.toString() !== req.user.id);
          return {
              _id: chat._id,
              username: otherUser ? otherUser.username : "Unknown",
          };
      });

      res.json(formattedChats);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


module.exports = {
    getOrCreateChat,
    getUserChats
};
