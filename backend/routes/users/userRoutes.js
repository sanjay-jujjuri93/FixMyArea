// backend/routes/api/userRoutes.js

const express = require('express');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');

const router = express.Router();

/**
 * @route   GET /api/users/workers
 * @desc    Get all users with the 'worker' role
 * @access  Private (Admin only)
 */
router.get('/workers', roleAuth(['admin']), async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('-passwordHash -__v');
    res.json(workers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/me
 * @desc    Get the details of the logged-in user
 * @access  Private (All authenticated users)
 */
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -__v');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * @route   GET /api/users/workers-by-village
 * @desc    Get all workers grouped by their village
 * @access  Private (Admin only)
 */
router.get('/workers-by-village', roleAuth(['admin']), async (req, res) => {
  try {
    const workersByVillage = await User.aggregate([
      { $match: { role: 'worker' } }, // Only workers
      {
        $group: {
          _id: "$village", // Group by village
          workers: {
            $push: {
              _id: "$_id",
              name: "$name",
              phone: "$phone"
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          village: "$_id",
          workers: 1,
          count: 1
        }
      },
      { $sort: { village: 1 } } // Sort by village name
    ]);
    res.json(workersByVillage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
