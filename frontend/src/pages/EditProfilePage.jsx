import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    dob: '',
    gender: '',
    state: '',
    district: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://fixmyarea-backend-6enz.onrender.com/api/users/me', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
        
        // Initialize form data with current user data
        setFormData({
          phone: res.data.phone || '',
          dob: res.data.dob ? res.data.dob.split('T')[0] : '',
          gender: res.data.gender || '',
          state: res.data.state || '',
          district: res.data.district || '',
          pincode: res.data.pincode || ''
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      // Only send fields that are being updated (not empty)
      const updateData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] && formData[key].trim() !== '') {
          updateData[key] = formData[key];
        }
      });

      const res = await axios.put(
        'https://fixmyarea-backend-6enz.onrender.com/api/users/profile',
        updateData,
        {
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Profile updated successfully!');
      
      // Update user data
      setUser(res.data);
      
      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const isFieldEditable = (fieldValue) => {
    return !fieldValue || fieldValue === '' || fieldValue === 'Not provided';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/30 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-300 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">⚙️ Account Settings</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">Edit</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Profile</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Update your personal information and account details
          </p>
        </div>

        {/* Edit Profile Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Profile</span>
              </button>
            </div>

            {/* Profile Header */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-6">
                <span className="text-white text-3xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{user?.name || 'User'}</h2>
                <p className="text-white/60">
                  Only fields showing "Not provided" can be edited
                </p>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="text-green-300 text-center font-semibold">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-center font-semibold">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-cyan-300 font-semibold mb-4 flex items-center">
                  <span className="mr-2">📱</span>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    {isFieldEditable(user?.phone) ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.phone} (Cannot be changed)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-cyan-300 font-semibold mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    {isFieldEditable(user?.dob) ? (
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'} (Cannot be changed)
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Gender
                    </label>
                    {isFieldEditable(user?.gender) ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.gender || 'Not provided'} (Cannot be changed)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-cyan-300 font-semibold mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Location Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      State
                    </label>
                    {isFieldEditable(user?.state) ? (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.state || 'Not provided'} (Cannot be changed)
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      District
                    </label>
                    {isFieldEditable(user?.district) ? (
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Enter your district"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.district || 'Not provided'} (Cannot be changed)
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Pincode
                    </label>
                    {isFieldEditable(user?.pincode) ? (
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter your pincode"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-white/70 cursor-not-allowed">
                        {user?.pincode || 'Not provided'} (Cannot be changed)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {saving ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
