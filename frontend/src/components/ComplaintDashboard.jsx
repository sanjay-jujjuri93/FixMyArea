// File: frontend/src/components/ComplaintDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all public complaints
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('https://fixmyarea-backend.onrender.com/api/complaints/public');
      setComplaints(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
      setError('Failed to load complaints.');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle Upvote
  const handleUpvote = async (complaintId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to upvote a complaint.');
        return;
      }
      
      const config = { headers: { 'x-auth-token': token } };
      await axios.put(
        `https://fixmyarea-backend.onrender.com/api/complaints/${complaintId}/upvote`,
        {},
        config
      );

      alert('Complaint upvoted successfully!');
      fetchComplaints();
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || 'Failed to upvote complaint.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading complaints...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">All Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col justify-between h-full transform hover:-translate-y-1"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {complaint.title}
                </h3>
                <p className="text-sm text-gray-500">Category: {complaint.category}</p>
                <p className="text-gray-700 mt-2">{complaint.description}</p>

                {/* Complaint image if available */}
                {complaint.photoURL && (
                  <img
                    src={complaint.photoURL}
                    alt="Complaint"
                    className="mt-3 rounded-md max-h-48 w-full object-cover"
                  />
                )}
              </div>

              {/* Status + Upvote section */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      complaint.status === 'Open'
                        ? 'bg-red-200 text-red-800'
                        : complaint.status === 'In Progress'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {complaint.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    By {complaint.createdBy?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleUpvote(complaint._id)}
                    className="flex-grow px-3 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Upvote
                  </button>
                  <span className="text-sm text-gray-600">
                    {complaint.upvotes?.length || 0}{' '}
                    {complaint.upvotes?.length === 1 ? 'upvote' : 'upvotes'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No complaints found. Be the first to report one!
          </p>
        )}
      </div>
    </div>
  );
};

export default ComplaintDashboard;
