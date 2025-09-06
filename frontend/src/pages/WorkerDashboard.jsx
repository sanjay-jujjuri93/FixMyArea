import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://fixmyarea-backend-6enz.onrender.com';

const WorkerDashboard = () => {
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);
  const [formData, setFormData] = useState({
    updateText: '',
    photo: null,
  });

  const fetchAssignedComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/complaints/assigned`, {
        headers: { 'x-auth-token': token }
      });
      setAssignedComplaints(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks. Make sure you are logged in as a Worker.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  const handleUpdateClick = (complaintId) => {
    setCurrentComplaintId(complaintId);
    setShowResolveForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { updateText, photo } = formData;
    if (!updateText || !photo) {
      alert('Please provide a message and a photo.');
      return;
    }
    
    const data = new FormData();
    data.append('status', 'Resolved');
    data.append('updateText', updateText);
    data.append('photo', photo);
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/complaints/${currentComplaintId}/status`, 
        data,
        { headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' } }
      );
      
      fetchAssignedComplaints();
      alert('Task status updated successfully!');
      setShowResolveForm(false);
      setFormData({ updateText: '', photo: null });
    } catch (err) {
      console.error(err);
      alert('Failed to update task status.');
    }
  };

  const handleStartWork = async (complaintId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/complaints/${complaintId}/status`,
        { status: 'In Progress' },
        { headers: { 'x-auth-token': token } }
      );
      fetchAssignedComplaints();
      alert('Work started successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to start work.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your assigned tasks...</p>
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
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">👷 Worker Control Panel</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">Worker</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Manage your assigned tasks and update complaint resolution status
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{assignedComplaints.length}</p>
              </div>
              <div className="bg-blue-500/30 p-3 rounded-xl">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{assignedComplaints.filter(c => c.status === 'In Progress').length}</p>
              </div>
              <div className="bg-yellow-500/30 p-3 rounded-xl">
                <span className="text-2xl">🔧</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{assignedComplaints.filter(c => c.status === 'Resolved').length}</p>
              </div>
              <div className="bg-green-500/30 p-3 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Form */}
        {showResolveForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl w-full max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-6">✅ Mark as Resolved</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/90 font-semibold mb-2">Update Message</label>
                  <textarea
                    name="updateText"
                    value={formData.updateText}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    rows="4"
                    placeholder="Describe how you resolved the issue..."
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-white/90 font-semibold mb-2">Proof of Resolution (Image)</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowResolveForm(false)}
                    className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Proof
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task Cards */}
        {assignedComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignedComplaints.map(complaint => (
              <div 
                key={complaint._id} 
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <Link to={`/complaints/${complaint._id}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2">
                    {complaint.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                    complaint.status === 'Open' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse' :
                    complaint.status === 'In Progress' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                    'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  }`}>
                    {complaint.status === 'Open' ? '🔴 Open' :
                     complaint.status === 'In Progress' ? '🟡 In Progress' :
                     '🟢 Resolved'}
                  </span>
                  <span className="text-white/60 text-xs">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-white/70 text-sm mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  {complaint.address}
                </p>

                <div className="space-y-2">
                  {complaint.status === 'In Progress' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(complaint._id);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                    >
                      ✅ Mark as Resolved
                    </button>
                  )}
                  {complaint.status === 'Open' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartWork(complaint._id);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
                    >
                      🔧 Start Work
                    </button>
                  )}
                  {complaint.status === 'Resolved' && (
                    <div className="flex items-center justify-center text-green-300 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Task completed successfully
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">👷‍♂️</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Tasks Assigned</h3>
            <p className="text-white/70 mb-4">You don't have any tasks assigned at the moment.</p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-md mx-auto">
              <p className="text-white/60 text-sm">💡 New tasks will appear here when assigned by administrators</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
