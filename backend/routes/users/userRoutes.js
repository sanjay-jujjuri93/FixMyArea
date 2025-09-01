// backend/routes/api/userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs'); // for password hashing
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, password, dob, gender, state, district, village, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      phone,
      passwordHash,
      dob,
      gender,
      state,
      district,
      village,
      pincode,
      role: 'citizen' // default role
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully', user: { fullName, phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
