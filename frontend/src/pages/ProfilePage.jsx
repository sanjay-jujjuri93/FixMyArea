import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-8 text-gray-600">No profile data found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
        <div className="space-y-4 text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
          <p><strong>State:</strong> {user.state || 'N/A'}</p>
          <p><strong>District:</strong> {user.district || 'N/A'}</p>
          <p><strong>Village:</strong> {user.village || 'N/A'}</p>
          <p><strong>Pincode:</strong> {user.pincode || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;