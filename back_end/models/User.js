const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  fcmToken: { type: String }, // Store the FCM token

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
  },

  // Reset Password Fields
  resetPasswordOtp: { type: String }, // Store the reset token
  resetPasswordExpires: { type: Number }, // Store expiry timestamp

}, { timestamps: true });

UserSchema.index({ location: '2dsphere' }); // Enables geospatial queries

// Hash password before saving (for signup and password reset)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Check if the password is already hashed
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return next();
  }

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
