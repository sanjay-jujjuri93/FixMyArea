import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AuthSelection from './pages/AuthSelection';
import NewComplaintPage from './pages/NewComplaintPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ContactMessagesPage from './pages/ContactMessagesPage';
import RegisterSelection from './pages/RegisterSelection';

const PrivateRoute = ({ children, user, roles }) => {
  if (!user) {
    return <Navigate to="/auth-selection" />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const renderDashboard = () => {
    if (!user) {
      return <DashboardPage />;
    }
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'worker':
        return <WorkerDashboard />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} setUser={setUser} onSidebarToggle={toggleSidebar} />
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar} 
          user={user} 
          setUser={setUser} 
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-messages" element={<PrivateRoute user={user} roles={['admin']}><ContactMessagesPage /></PrivateRoute>} />
          
          <Route path="/auth-selection" element={<AuthSelection />} />
          <Route path="/register-selection" element={<RegisterSelection />} />
          <Route path="/login/:role" element={<LoginPage setUser={setUser} />} />
          <Route path="/register/:role" element={<RegisterPage />} />
          
          <Route path="/dashboard" element={renderDashboard()} />
          <Route path="/new-complaint" element={<PrivateRoute user={user}><NewComplaintPage /></PrivateRoute>} />
          <Route path="/complaints/:id" element={<PrivateRoute user={user}><ComplaintDetailsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute user={user}><ProfilePage /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute user={user}><EditProfilePage /></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
};
export default App;