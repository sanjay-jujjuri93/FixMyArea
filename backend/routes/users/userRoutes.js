const express = require('express');
const User = require('../../models/User');
const Complaint = require('../../models/Complaint');
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).send('Server error');
  }
});

router.get('/workers', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('-passwordHash');
    res.json(workers);
  } catch (err) {
    console.error('Error fetching workers:', err);
    res.status(500).send('Server error');
  }
});

router.get('/workers-by-village', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const workersByVillage = await User.aggregate([
      { $match: { role: 'worker' } },
      {
        $group: {
          _id: '$village',
          workers: {
            $push: {
              _id: '$_id',
              name: '$name',
              phone: '$phone',
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          village: '$_id',
          workers: 1,
          count: 1,
        },
      },
      { $sort: { village: 1 } },
    ]);
    res.json(workersByVillage);
  } catch (err) {
    console.error('Error fetching workers by village:', err);
    res.status(500).send('Server error');
  }
});

router.delete('/remove-worker/:workerId', auth, roleAuth(['admin']), async (req, res) => {
  const { workerId } = req.params;
  const { removalKey } = req.body;

  if (removalKey !== process.env.REMOVE_WORKER_KEY) {
    return res.status(400).json({ msg: 'Invalid removal key' });
  }

  try {
    const worker = await User.findByIdAndDelete(workerId);
    if (!worker) {
      return res.status(404).json({ msg: 'Worker not found' });
    }
    await Complaint.updateMany({ assignedTo: workerId }, { assignedTo: null, status: 'Open' });
    res.status(200).json({ msg: 'Worker removed successfully' });
  } catch (err) {
    console.error('Error removing worker:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;