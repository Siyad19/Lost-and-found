const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true, index: '2dsphere' } // GeoJSON format
  },
  imageUrl: { type: String, default: '' },
  status: { type: String, enum: ['lost', 'found', 'returned'], default: 'lost' },
  category: { type: String, required: true }, // ✅ Category is required (no default)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
