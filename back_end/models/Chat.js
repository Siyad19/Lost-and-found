const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], 
});

module.exports = mongoose.model('Chat', chatSchema);
