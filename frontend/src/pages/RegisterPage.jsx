import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import indianStatesWithDistricts from '../data/indianStatesWithDistricts';

const RegisterPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    dob: '',
    gender: '',
    state: '',
    district: '',
    village: '',
    pincode: '',
    confirmPassword: '',
    registrationKey: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => {
        const newData = { ...prevData, [name]: files ? files[0] : value };
        if (name === 'state') {
            newData.district = '';
        }
        return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let dataToSend = { ...formData, role };
      delete dataToSend.confirmPassword;

      if (role === 'citizen') {
        delete dataToSend.registrationKey;
      }

      await axios.post('https://fixmyarea-backend-6enz.onrender.com/api/auth/register', dataToSend);

      alert('Registration successful! Please log in.');
      navigate('/auth-selection');
    } catch (err) {
      console.error('Frontend registration error:', err);
      setError(err.response?.data?.msg || 'Registration failed due to a server error. Please check the backend terminal.');
    }
  };

  const states = Object.keys(indianStatesWithDistricts);
  const districts = formData.state ? indianStatesWithDistricts[formData.state] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-2xl">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 font-semibold">📝 Create Account</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-4">
              <span className="text-white drop-shadow-2xl">Join</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> FixMyArea</span>
            </h1>
            <p className="text-lg text-white/70 mb-2">
              Register as <span className="text-cyan-300 font-semibold capitalize">{role}</span>
            </p>
          </div>

          {/* Registration Form */}
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
                  <label className="block text-white/90 font-semibold mb-2">👤 Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/90 font-semibold mb-2">📱 Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/90 font-semibold mb-2">🔒 Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/90 font-semibold mb-2">🔐 Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {/* Citizen-specific fields */}
              {role === 'citizen' && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/90 font-semibold mb-2">📅 Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 font-semibold mb-2">⚧️ Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                      >
                        <option value="" className="text-gray-800">Select Gender</option>
                        <option value="Male" className="text-gray-800">Male</option>
                        <option value="Female" className="text-gray-800">Female</option>
                        <option value="Other" className="text-gray-800">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-white/90 font-semibold mb-2">🏛️ State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                      >
                        <option value="" className="text-gray-800">Select your State</option>
                        {states.map((state) => (
                          <option key={state} value={state} className="text-gray-800">{state}</option>
                        ))}
                      </select>
                    </div>
                    {formData.state && (
                      <div>
                        <label className="block text-white/90 font-semibold mb-2">🏙️ District</label>
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          required
                        >
                          <option value="" className="text-gray-800">Select your District</option>
                          {districts.map((district) => (
                            <option key={district} value={district} className="text-gray-800">{district}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-white/90 font-semibold mb-2">🏘️ Village</label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your village"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 font-semibold mb-2">📮 Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter pincode"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Admin/Worker Registration Key */}
              {(role === 'admin' || role === 'worker') && (
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 backdrop-blur-md rounded-xl p-6 border border-yellow-500/20">
                  <h3 className="text-yellow-300 font-bold text-lg mb-4 flex items-center">
                    <span className="mr-2">🔑</span>
                    Authorization Required
                  </h3>
                  <div>
                    <label className="block text-white/90 font-semibold mb-2">🛡️ Secret Registration Key</label>
                    <input
                      type="text"
                      name="registrationKey"
                      value={formData.registrationKey}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter the secret key provided by admin"
                      required
                    />
                    <p className="text-white/60 text-sm mt-2">This key is required for {role} registration</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🚀 Create Account
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate(`/login/${role}`)}
                  className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <div className="text-center mt-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
              role === 'admin' ? 'bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300' :
              role === 'worker' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 text-yellow-300' :
              'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 text-blue-300'
            }`}>
              {role === 'admin' ? '👑' : role === 'worker' ? '👷' : '👤'} {role} Registration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;