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
  dob: { type: Date, required: false },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },
  state: { type: String, required: false },
  district: { type: String, required: false },
  village: { type: String, required: false },
  pincode: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);