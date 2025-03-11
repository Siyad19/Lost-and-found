const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const authMiddleware = require('../middleware/authMiddleware'); // Ensure authentication middleware is used

// @route   PUT /api/location/update
// @desc    Update user location
// @access  Private (Requires authentication)
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from authentication
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Update user's location in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Location updated successfully', location: user.location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
