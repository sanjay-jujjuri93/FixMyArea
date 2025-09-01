const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, phone, password, role, dob, gender, state, district, village, pincode, registrationKey } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: 'A user with this phone number already exists.' });
    }

    if (role === 'admin') {
      if (registrationKey !== process.env.ADMIN_REGISTER_KEY) {
        return res.status(400).json({ msg: 'Invalid registration key for Admin.' });
      }
    } else if (role === 'worker') {
      if (registrationKey !== process.env.WORKER_REGISTER_KEY) {
        return res.status(400).json({ msg: 'Invalid registration key for Worker.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: phone,
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

router.post('/login', async (req, res) => {
  const { phone, password, role } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(400).json({ msg: 'Invalid credentials for this role' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

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