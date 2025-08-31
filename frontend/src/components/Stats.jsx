// File: frontend/src/components/Stats.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [counts, setCounts] = useState({ solved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/counts');
        setCounts(response.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading stats...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 lg:space-x-12 my-12">
      {/* Solved Issues */}
      <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-5xl font-bold text-green-600 tracking-tight">
          {counts.solved}
        </h3>
        <p className="text-lg text-gray-600 mt-2 font-medium">Issues Solved</p>
      </div>

      {/* Pending Issues */}
      <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-5xl font-bold text-red-600 tracking-tight">
          {counts.pending}
        </h3>
        <p className="text-lg text-gray-600 mt-2 font-medium">Issues Pending</p>
      </div>
    </div>
  );
};

export default Stats;
