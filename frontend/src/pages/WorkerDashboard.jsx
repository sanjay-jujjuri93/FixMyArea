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

  if (loading) return <div className="text-center mt-8">Loading your assigned tasks...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 my-6">Your Assigned Tasks</h2>
      
      {showResolveForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-4">Mark as Resolved</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Update Message</label>
                <textarea
                  name="updateText"
                  value={formData.updateText}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Proof of Solved (Image)</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowResolveForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {assignedComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedComplaints.map(complaint => (
            <div key={complaint._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <Link to={`/complaints/${complaint._id}`}>
                <h3 className="text-xl font-semibold hover:text-blue-600">{complaint.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">Status: {complaint.status}</p>
              <p className="text-sm text-gray-500">Address: {complaint.address}</p>
              <div className="mt-4 space-x-2">
                  {complaint.status === 'In Progress' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateClick(complaint._id);
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                  >
                    Mark as Resolved
                  </button>
                  )}
                  {complaint.status === 'Open' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartWork(complaint._id);
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700"
                  >
                    Start Work
                  </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No tasks currently assigned to you.</p>
      )}
    </div>
  );
};
export default WorkerDashboard;