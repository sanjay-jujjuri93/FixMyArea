// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['citizen', 'admin', 'worker'],
    default: 'citizen'
  },
  phone: { type: String, required: true, unique: true },
  dob: { type: Date },
  
  // ✅ Gender field is now optional
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },

  state: { type: String },
  district: { type: String },
  village: { type: String },
  
  // ✅ New field for pincode
  pincode: { type: String },

  createdAt: { type: Date, default: Date.now }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
