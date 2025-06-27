const express = require('express');
const router = express.Router();
const User = require('../models/User'); // make sure path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// 🔐 Protected route to update profile
router.put('/update-profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { username, email, mobileNumber } = req.body;

  try {
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (mobileNumber) updateFields.mobileNumber = mobileNumber;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


// 👤 Public route: Get profile by user ID
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
