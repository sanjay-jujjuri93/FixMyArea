// File: frontend/src/pages/NewComplaintPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Roads', 'Garbage', 'Streetlights', 'Water', 'Drainage', 'Stray Dogs', 'Safety'
];

// ✅ Using OpenStreetMap Nominatim API (no API key required)

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit form
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

      await axios.post('https://fixmyarea-backend.onrender.com/api/complaints', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });

      alert('Complaint submitted successfully!');
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(err.response?.data?.msg || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocoding with Nominatim
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (res.data.address) {
        const address = res.data.display_name;
        const addressDetails = res.data.address;

        setFormData((prevData) => ({
          ...prevData,
          address: address,
          state: addressDetails.state || '',
          district: addressDetails.county || addressDetails.city || '',
          village:
            addressDetails.village ||
            addressDetails.suburb ||
            addressDetails.city_district ||
            '',
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

  // Get current device location
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            lat: latitude,
            lng: longitude,
          }));
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Report a New Issue
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              required
            />
          </div>

          {/* Location */}
          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex-grow px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              Get My Location
            </button>
            <div className="flex-grow">
              {formData.address && (
                <span className="text-sm text-gray-600">
                  Address: {formData.address}
                </span>
              )}
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                Village / Locality
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                Full Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewComplaintPage;
