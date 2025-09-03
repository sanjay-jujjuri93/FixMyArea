import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/complaints/analytics/categories', {
          headers: { 'x-auth-token': token }
        });
        setCategoryData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading analytics...</div>;
  if (error) return <div className="text-center mt-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">Complaint Statistics by Category</h3>
      <ul className="space-y-2">
        {categoryData.length > 0 ? (
          categoryData.map(item => (
            <li key={item._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-medium">{item._id}</span>
              <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">{item.count}</span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No complaint data to display.</p>
        )}
      </ul>
    </div>
  );
};

export default Analytics;