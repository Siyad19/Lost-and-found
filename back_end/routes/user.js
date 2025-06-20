const express = require('express');
const router = express.Router();
const User = require('../models/User'); // make sure path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// 🔐 Protected route to update profile
router.put('/update-profile', authMiddleware, async (req, res) => {
  const userId = req.user.id; // from JWT
  const { email, password } = req.body;

  try {
    const updateFields = {};

    if (email) updateFields.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
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

module.exports = router;
