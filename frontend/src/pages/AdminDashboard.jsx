import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Analytics from "../components/Analytics";

const BASE_URL = "https://fixmyarea-backend-6enz.onrender.com";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [workersByVillage, setWorkersByVillage] = useState([]);
  const [complaintsByVillage, setComplaintsByVillage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { "x-auth-token": token } };

      const complaintsRes = await axios.get(`${BASE_URL}/api/complaints`, config);
      setComplaints(complaintsRes.data);

      const workersRes = await axios.get(`${BASE_URL}/api/users/workers`, config);
      setWorkers(workersRes.data);

      const workersByVillageRes = await axios.get(`${BASE_URL}/api/users/workers-by-village`, config);
      setWorkersByVillage(workersByVillageRes.data);

      const complaintsByVillageRes = await axios.get(`${BASE_URL}/api/complaints/by-village`, config);
      setComplaintsByVillage(complaintsByVillageRes.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load data. Make sure you are logged in as an Admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAssign = async (complaintId, workerId) => {
    if (!workerId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/complaints/${complaintId}/assign`,
        { workerId },
        { headers: { "x-auth-token": token } }
      );
      fetchAllData();
      alert("Complaint assigned successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign complaint.");
    }
  };

  const handleRemoveWorker = async (workerId) => {
    const removalKey = prompt("Enter the secure removal key:");
    if (!removalKey) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/users/remove-worker/${workerId}`, {
        headers: { "x-auth-token": token },
        data: { removalKey },
      });
      fetchAllData();
      alert("Worker removed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to remove worker.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-xl font-semibold">Loading admin dashboard...</span>
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
            onClick={() => window.location.reload()} 
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
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">👑 Admin Control Center</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">Admin</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Advanced management system with real-time analytics and intelligent automation
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium">Total Complaints</p>
                <p className="text-3xl font-bold text-white">{complaints.length}</p>
              </div>
              <div className="bg-emerald-500/30 p-3 rounded-xl">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Active Workers</p>
                <p className="text-3xl font-bold text-white">{workers.length}</p>
              </div>
              <div className="bg-blue-500/30 p-3 rounded-xl">
                <span className="text-2xl">👷</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Villages</p>
                <p className="text-3xl font-bold text-white">{workersByVillage.length}</p>
              </div>
              <div className="bg-purple-500/30 p-3 rounded-xl">
                <span className="text-2xl">🏘️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">Open Issues</p>
                <p className="text-3xl font-bold text-white">{complaints.filter(c => c.status === 'Open').length}</p>
              </div>
              <div className="bg-orange-500/30 p-3 rounded-xl">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Analytics Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">📊 Analytics</h3>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                <Analytics />
              </div>
            </div>

            {/* Advanced Workers Management */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  👷 Worker Management
                </h3>
                <div className="bg-blue-500/30 px-3 py-1 rounded-full">
                  <span className="text-blue-200 text-sm font-bold">{workers.length} Active</span>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {workersByVillage.length > 0 ? (
                  workersByVillage.map((group) => (
                    <div key={group.village} className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-cyan-300">
                          🏘️ {group.village}
                        </h4>
                        <span className="bg-cyan-500/30 px-2 py-1 rounded-full text-cyan-200 text-xs font-bold">
                          {group.count} workers
                        </span>
                      </div>
                      <div className="space-y-2">
                        {group.workers.map((worker) => (
                          <div
                            key={worker._id}
                            className="group flex justify-between items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/5"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                  {worker.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{worker.name}</p>
                                <p className="text-white/60 text-sm">📞 {worker.phone}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveWorker(worker._id)}
                              className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-sm rounded-lg transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👷‍♂️</div>
                    <p className="text-white/70 text-lg">No workers assigned yet</p>
                    <p className="text-white/50 text-sm">Workers will appear here once registered</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Advanced Complaint Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">🏘️ Smart Complaint Management</h3>
                <div className="flex space-x-2">
                  <div className="bg-red-500/30 px-3 py-1 rounded-full">
                    <span className="text-red-200 text-xs font-bold">{complaints.filter(c => c.status === 'Open').length} Open</span>
                  </div>
                  <div className="bg-yellow-500/30 px-3 py-1 rounded-full">
                    <span className="text-yellow-200 text-xs font-bold">{complaints.filter(c => c.status === 'In Progress').length} Progress</span>
                  </div>
                  <div className="bg-green-500/30 px-3 py-1 rounded-full">
                    <span className="text-green-200 text-xs font-bold">{complaints.filter(c => c.status === 'Resolved').length} Resolved</span>
                  </div>
                </div>
              </div>
              
              {complaintsByVillage.length > 0 ? (
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {complaintsByVillage.map((group) => (
                    <div
                      key={group.village}
                      className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-xl text-cyan-300 flex items-center">
                          🏘️ {group.village}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="bg-cyan-500/30 px-2 py-1 rounded-full text-cyan-200 text-xs font-bold">
                            {group.complaints.length} issues
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.complaints.map((complaint) => (
                          <div
                            key={complaint._id}
                            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                          >
                            <Link to={`/complaints/${complaint._id}`}>
                              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2">
                                {complaint.title}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center justify-between mb-4">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                                complaint.status === "Open" ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse' :
                                complaint.status === "In Progress" ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                                'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                              }`}>
                                {complaint.status === "Open" ? "🔴 Open" :
                                 complaint.status === "In Progress" ? "🟡 In Progress" :
                                 "🟢 Resolved"}
                              </span>
                              <span className="text-white/60 text-xs">
                                {new Date(complaint.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {complaint.status === "Open" && (
                              <div className="space-y-2">
                                <select
                                  onChange={(e) =>
                                    handleAssign(complaint._id, e.target.value)
                                  }
                                  className="w-full p-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none hover:from-white/15 hover:to-white/10 transition-all duration-300"
                                >
                                  <option value="" className="text-gray-800">🎯 Assign to worker...</option>
                                  {workers.map((worker) => (
                                    <option key={worker._id} value={worker._id} className="text-gray-800">
                                      👷 {worker.name}
                                    </option>
                                  ))}
                                </select>
                                <div className="flex items-center text-white/50 text-xs">
                                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
                                  Awaiting assignment
                                </div>
                              </div>
                            )}
                            
                            {complaint.status === "In Progress" && (
                              <div className="flex items-center text-yellow-300 text-xs">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                                Worker assigned - In progress
                              </div>
                            )}
                            
                            {complaint.status === "Resolved" && (
                              <div className="flex items-center text-green-300 text-xs">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                ✅ Successfully resolved
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">📋</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Complaints Found</h3>
                  <p className="text-white/70 mb-4">The community hasn't submitted any complaints yet.</p>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-white/60 text-sm">💡 Complaints will appear here once citizens start reporting issues</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
