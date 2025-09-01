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
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return setError('Please log in to view your complaints.');
        }

        const res = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/complaints/me', {
          headers: { 'x-auth-token': token }
        });

        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load complaints. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserComplaints();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading your complaints...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 my-6">Your Submitted Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.length > 0 ? (
          complaints.map(complaint => (
            <div key={complaint._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <Link to={`/complaints/${complaint._id}`} className="block">
                <h3 className="text-xl font-semibold hover:text-blue-600">{complaint.title}</h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">Category: {complaint.category}</p>
              <p className="text-gray-700 mt-2">{complaint.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  complaint.status === 'Open' ? 'bg-red-200 text-red-800' :
                  complaint.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {complaint.status}
                </span>
                <span className="text-sm text-gray-500">
                  By {complaint.createdBy?.name || 'N/A'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">You haven't submitted any complaints yet.</p>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;