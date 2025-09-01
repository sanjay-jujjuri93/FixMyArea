import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusCounts = () => {
  const [counts, setCounts] = useState({ solved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/complaints/counts');
        setCounts(response.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
        setError('Failed to load counts.');
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading counts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex justify-center space-x-8 my-8">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-4xl font-bold text-green-600">{counts.solved}</h3>
        <p className="text-gray-600 mt-2">Issues Solved</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-4xl font-bold text-red-600">{counts.pending}</h3>
        <p className="text-gray-600 mt-2">Issues Pending</p>
      </div>
    </div>
  );
};

export default StatusCounts;