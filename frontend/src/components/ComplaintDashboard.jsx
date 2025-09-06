import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "https://fixmyarea-backend-6enz.onrender.com/api/complaints/public"
        );
        setComplaints(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleUpvote = async (e, complaintId) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://fixmyarea-backend-6enz.onrender.com/api/complaints/${complaintId}/upvote`
      );
      // Refresh complaints after upvote
      const res = await axios.get(
        "https://fixmyarea-backend-6enz.onrender.com/api/complaints/public"
      );
      setComplaints(res.data);
    } catch (error) {
      console.error("Error upvoting complaint:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // Categories for filtering (dynamic)
  const categories = ['All', ...Array.from(new Set(complaints.map(c => c.category)))];

  // Filtering logic
  const filteredComplaints = filter === 'All'
    ? complaints
    : complaints.filter(c => c.category === filter);

  return (
    <section id="complaint-dashboard" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg mb-8">
            <span className="text-emerald-600 font-semibold">🏘️ Community Voice</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Live
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent"> Issues</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time community issues with AI-powered categorization and collaborative resolution tracking
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                filter === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-500/25'
                  : 'bg-white/70 backdrop-blur-md text-gray-700 border-gray-200 hover:bg-white/90 hover:shadow-lg hover:border-emerald-300'
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map(complaint => (
              <div
                key={complaint._id}
                className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col justify-between h-full transition-all duration-500 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-4 hover:scale-105"
              >
                <div>
                  <Link to={`/complaints/${complaint._id}`}>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 mb-4">
                      {complaint.title}
                    </h3>
                  </Link>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-4 shadow-sm">
                    <span className="text-xs font-semibold text-gray-600">
                      📂 {complaint.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">{complaint.description}</p>
                  
                  {complaint.photoURL && (
                    <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
                      <img 
                        src={complaint.photoURL} 
                        alt="Complaint" 
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl">
                    <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-sm ${
                      complaint.status === 'Open'
                        ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                        : complaint.status === 'In Progress'
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                        : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                    }`}>
                      {complaint.status}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
                      👤 {complaint.createdBy?.name || 'Anonymous'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => handleUpvote(e, complaint._id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 group-hover:animate-pulse"
                    >
                      👍 Support
                    </button>
                    <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100/80 backdrop-blur-sm rounded-2xl shadow-sm">
                      <span className="text-2xl">❤️</span>
                      <span className="text-sm font-bold text-gray-700">
                        {complaint.upvotes?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50 max-w-lg mx-auto">
                <div className="text-8xl mb-8 animate-bounce">🔍</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">No Issues Found</h3>
                <p className="text-gray-600 mb-8 text-lg">Be the first to report an issue in your community and make a difference!</p>
                <Link
                  to="/new-complaint"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  🚀 Report First Issue
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ComplaintDashboard;
