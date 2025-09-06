import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const { role } = useParams();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://fixmyarea-backend-6enz.onrender.com/api/auth/login', {
        phone: formData.phone,
        password: formData.password,
        role,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setUser(res.data.user);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-2xl">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 font-semibold">🔐 Secure Login</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-4">
              <span className="text-white drop-shadow-2xl">Welcome</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Back</span>
            </h1>
            <p className="text-lg text-white/70 mb-2">
              Login as <span className="text-cyan-300 font-semibold capitalize">{role}</span>
            </p>
          </div>

          {/* Login Form */}
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
              <div>
                <label className="block text-white/90 font-semibold mb-2">📱 Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-2">🔒 Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🚀 Login to Dashboard
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate(`/register/${role}`)}
                  className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <div className="text-center mt-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
              role === 'Admin' ? 'bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300' :
              role === 'Worker' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 text-yellow-300' :
              'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 text-blue-300'
            }`}>
              {role === 'Admin' ? '👑' : role === 'Worker' ? '👷' : '👤'} {role} Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;