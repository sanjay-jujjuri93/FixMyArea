const express = require('express');
const Complaint = require('../../models/Complaint');
const WorkerUpdate = require('../../models/WorkerUpdate');
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');
const multer = require('multer');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, description, category, lat, lng, address, state, district, village } = req.body;
    if (!req.file) {
      return res.status(400).json({ msg: 'No photo uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    const newComplaint = new Complaint({
      title, description, category, photoURL: result.secure_url,
      location: { lat, lng },
      address, state, district, village,
      createdBy: req.user.id
    });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/public', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('createdBy', 'name');
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/counts', async (req, res) => {
  try {
    const solvedCount = await Complaint.countDocuments({ status: 'Resolved' });
    const pendingCount = await Complaint.countDocuments({ status: { $in: ['Open', 'In Progress'] } });
    res.json({ solved: solvedCount, pending: pendingCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id }).populate('createdBy', 'name');
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/assigned', auth, roleAuth(['worker']), async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedTo: req.user.id }).populate('createdBy', 'name').populate('assignedTo', 'name');
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/analytics/categories', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const categoryCounts = await Complaint.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
    res.json(categoryCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/worker-updates/:complaintId', async (req, res) => {
  try {
    const updates = await WorkerUpdate.find({ complaintId: req.params.complaintId })
      .populate('workerId', 'name')
      .sort({ timestamp: 1 });
    res.json(updates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/by-village', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const complaintsByVillage = await Complaint.aggregate([
      {
        $group: {
          _id: '$address.village',
          complaints: {
            $push: {
              _id: '$_id',
              title: '$title',
              status: '$status',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          village: '$_id',
          complaints: 1,
        },
      },
      { $sort: { village: 1 } },
    ]);
    res.json(complaintsByVillage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('createdBy', 'name').populate('assignedTo', 'name');
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id/assign', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const { workerId } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedTo: workerId, status: 'In Progress' },
      { new: true }
    ).populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id/status', auth, roleAuth(['worker']), upload.single('photo'), async (req, res) => {
  try {
    const { status, updateText } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    let photoURL = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      photoURL = result.secure_url;
    }

    complaint.status = status;
    await complaint.save();

    const newWorkerUpdate = new WorkerUpdate({
      complaintId: complaint._id,
      workerId: req.user.id,
      updateText,
      status,
      photoURL,
    });

    await newWorkerUpdate.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id/upvote', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    if (complaint.upvotes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'You have already upvoted this complaint' });
    }

    complaint.upvotes.push(req.user.id);
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;