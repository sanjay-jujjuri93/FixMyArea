// File: backend/models/Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the complaint
  description: { type: String },           // Detailed description
  category: {                              // Complaint category
    type: String,
    enum: ['Roads', 'Garbage', 'Streetlights', 'Water', 'Drainage', 'Stray Dogs', 'Safety'],
    required: true
  },
  photoURL: { type: String, required: true }, // URL of uploaded photo/proof
  location: {                                 // Latitude & Longitude
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  // Full textual address
  address: { type: String, required: true },
  // Separated address fields for better filtering & display
  state: { type: String },
  district: { type: String },
  village: { type: String },

  status: {                                 // Complaint status
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },

  createdBy: {                              // User who submitted the complaint
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {                             // Worker assigned to resolve it
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Users who upvoted the complaint
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  createdAt: { type: Date, default: Date.now } // Timestamp of creation
});

module.exports = mongoose.model('Complaint', complaintSchema);
