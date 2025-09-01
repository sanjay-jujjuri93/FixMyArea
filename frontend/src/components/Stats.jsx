import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [counts, setCounts] = useState({ solved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/complaints/counts');
        setCounts(response.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading stats...</div>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Impact Statistics</h3>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-green-700">Issues Solved</p>
          <span className="text-4xl font-bold text-green-600">{counts.solved}</span>
        </div>
        <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-red-700">Issues Pending</p>
          <span className="text-4xl font-bold text-red-600">{counts.pending}</span>
        </div>
      </div>
    </div>
  );
};
export default Stats;