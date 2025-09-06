import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Roads', 'Garbage', 'Streetlights', 'Water', 'Drainage', 'Stray Dogs', 'Safety'
];

const GEOCODING_API_KEY = 'YOUR_GEOCODING_API_KEY';

const NewComplaintPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    lat: '',
    lng: '',
    address: '',
    state: '',
    district: '',
    village: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.lat || !formData.lng || !formData.address) {
      setError('Please get your location or enter the address manually before submitting.');
      setLoading(false);
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to submit a complaint.');
        setLoading(false);
        return;
      }

      await axios.post(
        'https://fixmyarea-backend-6enz.onrender.com/api/complaints',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
          }
        }
      );

      alert('Complaint submitted successfully!');
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(err.response?.data?.msg || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      
      if (res.data.address) {
        const address = res.data.display_name;
        const addressDetails = res.data.address;

        setFormData(prevData => ({
          ...prevData,
          address: address,
          state: addressDetails.state || '',
          district: addressDetails.county || addressDetails.city || '',
          village: addressDetails.village || addressDetails.suburb || addressDetails.city_district || ''
        }));
        alert(`Location and Address set: ${address}`);
      } else {
        alert('Could not find an address for this location. Please enter it manually.');
      }
    } catch (err) {
      console.error('Reverse Geocoding Error:', err);
      setError('Failed to fetch address.');
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prevData => ({ ...prevData, lat: latitude, lng: longitude }));
          getAddressFromCoordinates(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError('Failed to get location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

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
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">📝 Report Issue</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white drop-shadow-2xl">New</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Complaint</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Help improve your community by reporting issues that need attention
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/90 font-semibold mb-2">📝 Issue Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/90 font-semibold mb-2">🏷️ Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  >
                    <option value="" className="text-gray-800">Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="text-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2">📄 Detailed Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Provide detailed information about the issue..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2">📸 Photo Evidence</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <p className="text-white/60 text-sm mt-2">Upload a clear photo showing the issue</p>
              </div>

              {/* Location Section */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Location Information
                </h3>
                
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    🎯 Get My Current Location
                  </button>
                  {formData.address && (
                    <div className="mt-3 p-3 bg-green-500/20 backdrop-blur-md rounded-lg border border-green-500/30">
                      <p className="text-green-300 text-sm font-medium">✅ Location detected:</p>
                      <p className="text-white/90 text-sm">{formData.address}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/90 font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/70 focus:outline-none"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 font-semibold mb-2">District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/70 focus:outline-none"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 font-semibold mb-2">Village / Locality</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/70 focus:outline-none"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-white/90 font-semibold mb-2">Complete Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Enter or edit the complete address..."
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting Complaint...
                  </div>
                ) : (
                  '🚀 Submit Complaint'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewComplaintPage;