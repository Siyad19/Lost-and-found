const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// @route   POST /api/auth/signup
// for Register new user
router.post('/signup', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('mobileNumber', 'Mobile number is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, mobileNumber } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ username, email, password, mobileNumber });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log('User created successfully:', user);
    await user.save();

    // Return JWT
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error('Error in signup:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// Authenticate user and get token
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log("Login request for email:", email);

    let user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log("User found:", user);
    console.log("Provided Password:", password);
    console.log("Stored Password Hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      console.log("Login successful");
      res.json({ token, user: { username: user.username } }); // Fixed response
    });

  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send('Server error');
  }
});



// @route   POST /api/auth/forgot-password
// Send password reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10); // Hash the token
    const expiresIn = Date.now() + 3600000; // Token valid for 1 hour

    user.resetPasswordToken = hashedToken; // Store hashed token
    user.resetPasswordExpires = expiresIn;
    await user.save();

    // Send email with raw reset token (not hashed)
    const resetURL = `http://192.168.1.73:8081/api/auth/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetURL}">${resetURL}</a>
             <p>This link will expire in 1 hour.</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent', token: resetToken });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @route   POST /api/auth/reset-password/:token
// Reset user password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Find user with an unexpired reset token
    let user = await User.findOne({
      resetPasswordExpires: { $gt: Date.now() } // Check expiration
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Compare the raw token with the hashed token in the database
    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user document without triggering the pre-save hook
    await User.updateOne(
      { _id: user._id },
      {
        password: newHashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      }
    );

    res.json({ message: "Password has been reset successfully" });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;