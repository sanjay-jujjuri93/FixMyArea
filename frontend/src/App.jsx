// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AuthSelection from './pages/AuthSelection';
import RegisterSelection from './pages/RegisterSelection';
import NewComplaintPage from './pages/NewComplaintPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';

// New pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when page refreshes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Decide which dashboard to render based on role
  const renderDashboard = () => {
    if (!user) {
      return <DashboardPage />; // fallback for guests
    }
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'worker':
        return <WorkerDashboard />;
      default: // citizen or unknown role
        return <DashboardPage />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Flow */}
          <Route path="/auth-selection" element={<AuthSelection />} />
          <Route path="/login/:role" element={<LoginPage setUser={setUser} />} />

          {/* Registration Flow */}
          <Route path="/register-selection" element={<RegisterSelection />} />
          <Route path="/register/:role" element={<RegisterPage />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={renderDashboard()} />

          {/* Complaints */}
          <Route path="/new-complaint" element={<NewComplaintPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />

          {/* User Profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Additional pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
