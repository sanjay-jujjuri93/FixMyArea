require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route Imports
const authRoutes = require('./routes/auth/authRoutes');
const complaintRoutes = require('./routes/complaints/complaintRoutes');
const userRoutes = require('./routes/users/userRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', userRoutes);
app.use('/api', emailRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('FixMyArea Backend is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});