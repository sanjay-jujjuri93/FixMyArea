// backend/routes/auth/authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (with role-based key validation)
// @access  Public
router.post('/register', async (req, res) => {
  const {
    name,
    phone,
    password,
    role,
    dob,
    gender,
    state,
    district,
    village,
    pincode,
    registrationKey,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: 'A user with this phone number already exists.' });
    }

    // Validate registration key for special roles
    if (role === 'admin') {
      if (registrationKey !== process.env.ADMIN_REGISTER_KEY) {
        return res.status(400).json({ msg: 'Invalid registration key for Admin.' });
      }
    } else if (role === 'worker') {
      if (registrationKey !== process.env.WORKER_REGISTER_KEY) {
        return res.status(400).json({ msg: 'Invalid registration key for Worker.' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email: phone, // Using phone as email for login
      passwordHash,
      role,
      phone,
      dob,
      gender,
      state,
      district,
      village,
      pincode,
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and return token
// @access  Public
router.post('/login', async (req, res) => {
  const { phone, password, role } = req.body; // ✅ Get role from request body

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ Check if role matches
    if (user.role !== role) {
      return res.status(400).json({ msg: 'Invalid credentials for this role' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
