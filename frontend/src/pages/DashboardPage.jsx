import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserComplaints = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your complaints.');
          setLoading(false);
          return;
        }

        const res = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/complaints/me', {
          headers: { 'x-auth-token': token }
        });

        setComplaints(res.data);
      } catch (err) {
        console.error('Dashboard error:', err);
        if (err.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load complaints. Please check your connection and try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserComplaints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-xl font-semibold">Loading your complaints...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md text-center">
          <div className="text-red-300 font-semibold mb-6 text-lg">{error}</div>
          <button 
            onClick={() => window.location.href = '/auth-selection'} 
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
            <span className="text-white/90 font-semibold">📊 Personal Dashboard</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">Your</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Complaints</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Track and manage all your submitted community issues in one place
          </p>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complaints.length > 0 ? (
            complaints.map(complaint => (
              <div 
                key={complaint._id} 
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Link to={`/complaints/${complaint._id}`} className="block">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {complaint.title}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white/90 text-sm font-medium">
                    📂 {complaint.category}
                  </span>
                </div>
                
                <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
                  {complaint.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-2 text-sm font-bold rounded-xl shadow-lg ${
                    complaint.status === 'Open' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' :
                    complaint.status === 'In Progress' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                    'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  }`}>
                    {complaint.status}
                  </span>
                  <span className="text-white/70 text-sm font-medium">
                    ✍️ {complaint.createdBy?.name || 'Anonymous'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-2xl max-w-md mx-auto">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Complaints Yet</h3>
                <p className="text-white/70 mb-8">You haven't submitted any complaints yet. Start making a difference in your community!</p>
                <Link 
                  to="/new-complaint"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Submit First Complaint
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
