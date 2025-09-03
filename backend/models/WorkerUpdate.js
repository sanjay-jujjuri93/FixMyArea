const mongoose = require('mongoose');

const workerUpdateSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updateText: { 
    type: String, 
    required: true 
  },
  photoURL: { 
    type: String // ✅ Field to store URL of the proof photo
  },
  status: {
    type: String,
    enum: ['In Progress', 'Resolved'],
    required: true
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('WorkerUpdate', workerUpdateSchema);
