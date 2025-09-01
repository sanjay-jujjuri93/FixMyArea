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
        const res = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/users/me', {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
        <div className="space-y-4 text-gray-700">
          <p className="border-b border-gray-100 pb-2"><strong>Name:</strong> {user.name || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>Role:</strong> {user.role || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>Gender:</strong> {user.gender || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>State:</strong> {user.state || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>District:</strong> {user.district || 'Not provided'}</p>
          <p className="border-b border-gray-100 pb-2"><strong>Village:</strong> {user.village || 'Not provided'}</p>
          <p><strong>Pincode:</strong> {user.pincode || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;