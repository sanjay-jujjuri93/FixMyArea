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
    const { name, phone, password, dob, gender, state, district, village, pincode } = req.body;

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
      name,
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

    res.status(201).json({ msg: 'User registered successfully', user: { name, phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    console.log('GET /api/users/me - User from token:', req.user);
    console.log('GET /api/users/me - Looking for user ID:', req.user.id);
    
    const user = await User.findById(req.user.id).select('-passwordHash');
    console.log('GET /api/users/me - User found:', user);
    
    if (!user) {
      console.log('GET /api/users/me - User not found in database');
      return res.status(404).json({ msg: 'User not found' });
    }
    
    console.log('GET /api/users/me - Sending user data:', user);
    res.json(user);
  } catch (err) {
    console.error('GET /api/users/me - Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/workers
 * @desc    Get all workers (admin only)
 * @access  Private (Admin)
 */
router.get('/workers', auth, roleAuth(['admin']), async (req, res) => {
  try {
    console.log('GET /api/users/workers - req.user:', req.user);
    console.log('GET /api/users/workers - User role:', req.user.role);
    
    const workers = await User.find({ role: 'worker' }).select('-passwordHash');
    console.log('GET /api/users/workers - Found workers:', workers.length);
    res.json(workers);
  } catch (err) {
    console.error('Error fetching workers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/workers-by-village
 * @desc    Get workers grouped by village (admin only)
 * @access  Private (Admin)
 */
router.get('/workers-by-village', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('-passwordHash');
    
    // Group workers by village
    const workersByVillage = workers.reduce((acc, worker) => {
      const village = worker.village || 'Unknown';
      if (!acc.find(group => group.village === village)) {
        acc.push({
          village,
          count: 0,
          workers: []
        });
      }
      
      const group = acc.find(g => g.village === village);
      group.count++;
      group.workers.push(worker);
      
      return acc;
    }, []);
    
    res.json(workersByVillage);
  } catch (err) {
    console.error('Error fetching workers by village:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   DELETE /api/users/remove-worker/:id
 * @desc    Remove a worker (admin only)
 * @access  Private (Admin)
 */
router.delete('/remove-worker/:id', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const { removalKey } = req.body;
    
    // Check removal key (you can set this in environment variables)
    if (removalKey !== process.env.ADMIN_REMOVAL_KEY) {
      return res.status(400).json({ msg: 'Invalid removal key' });
    }
    
    const worker = await User.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ msg: 'Worker not found' });
    }
    
    if (worker.role !== 'worker') {
      return res.status(400).json({ msg: 'User is not a worker' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Worker removed successfully' });
  } catch (err) {
    console.error('Error removing worker:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/test-auth
 * @desc    Test authentication (any authenticated user)
 * @access  Private
 */
router.get('/test-auth', auth, async (req, res) => {
  try {
    console.log('GET /api/users/test-auth - req.user:', req.user);
    res.json({ 
      msg: 'Authentication working!', 
      user: req.user,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error in test-auth:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
