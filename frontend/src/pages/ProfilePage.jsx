import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/users/me', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/30 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-300 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <div className="text-6xl mb-4">👤</div>
          <p className="text-white/70 text-xl">No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">👤 User Profile</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">My</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Profile</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Your personal information and account details
          </p>
        </div>

        {/* Profile Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            {/* Profile Header */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-6">
                <span className="text-white text-3xl font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{user.name || 'User'}</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                    user.role === 'Admin' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                    user.role === 'Worker' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                    'bg-gradient-to-r from-blue-500 to-indigo-600'
                  } text-white`}>
                    {user.role || 'User'}
                  </span>
                  <span className="text-white/60 text-sm">
                    Member since {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h3 className="text-cyan-300 font-semibold mb-2">📱 Contact Information</h3>
                  <p className="text-white/90 mb-1">
                    <span className="text-white/60">Phone:</span> {user.phone || 'Not provided'}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h3 className="text-cyan-300 font-semibold mb-2">👤 Personal Details</h3>
                  <p className="text-white/90 mb-1">
                    <span className="text-white/60">Date of Birth:</span> {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}
                  </p>
                  <p className="text-white/90">
                    <span className="text-white/60">Gender:</span> {user.gender || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h3 className="text-cyan-300 font-semibold mb-2">📍 Location Details</h3>
                  <p className="text-white/90 mb-1">
                    <span className="text-white/60">State:</span> {user.state || 'Not provided'}
                  </p>
                  <p className="text-white/90 mb-1">
                    <span className="text-white/60">District:</span> {user.district || 'Not provided'}
                  </p>
                  <p className="text-white/90">
                    <span className="text-white/60">Pincode:</span> {user.pincode || 'Not provided'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h3 className="text-purple-300 font-semibold mb-2">⚙️ Account Settings</h3>
                  <button 
                    onClick={() => navigate('/edit-profile')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-white font-bold text-xl mb-4">📊 Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <p className="text-white/60 text-sm">Complaints Filed</p>
                  <p className="text-white text-2xl font-bold">-</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-2xl mb-2">👍</div>
                  <p className="text-white/60 text-sm">Upvotes Given</p>
                  <p className="text-white text-2xl font-bold">-</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-white/60 text-sm">Community Score</p>
                  <p className="text-white text-2xl font-bold">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;