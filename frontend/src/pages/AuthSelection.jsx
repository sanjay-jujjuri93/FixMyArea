import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const AuthSelection = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('login'); // 'login' or 'register'

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Report issues and track complaints in your area',
      icon: '👤',
      color: 'from-blue-500/20 to-indigo-600/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-300',
      hoverColor: 'hover:from-blue-500/30 hover:to-indigo-600/30'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage complaints and oversee system operations',
      icon: '👑',
      color: 'from-red-500/20 to-pink-600/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-300',
      hoverColor: 'hover:from-red-500/30 hover:to-pink-600/30'
    },
    {
      id: 'worker',
      title: 'Worker',
      description: 'Resolve assigned tasks and update complaint status',
      icon: '👷',
      color: 'from-yellow-500/20 to-orange-600/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-300',
      hoverColor: 'hover:from-yellow-500/30 hover:to-orange-600/30'
    }
  ];

  const handleRoleSelect = (roleId) => {
    navigate(`/${authType}/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton variant="default" />
          </div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-2xl">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 font-semibold">
                {authType === 'login' ? '🔐 Login Portal' : '📝 Registration Portal'}
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
              <span className="text-white drop-shadow-2xl">
                {authType === 'login' ? 'Welcome to' : 'Join'}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> FixMyArea</span>
            </h1>
            <p className="text-xl text-white/70 mb-6">
              Choose your role to {authType === 'login' ? 'continue' : 'get started'}
            </p>
            
            {/* Auth Type Toggle */}
            <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 mb-6">
              <button
                onClick={() => setAuthType('login')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  authType === 'login'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🔐 Login
              </button>
              <button
                onClick={() => setAuthType('register')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  authType === 'register'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                📝 Register
              </button>
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`bg-gradient-to-br ${role.color} ${role.hoverColor} backdrop-blur-md rounded-2xl p-8 border ${role.borderColor} shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-3xl group`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${role.textColor} mb-3`}>
                    {role.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {role.description}
                  </p>
                  <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border ${role.borderColor} ${role.textColor} font-semibold text-sm transition-all duration-300 group-hover:bg-white/20`}>
                    {authType === 'login' ? 'Login' : 'Register'} as {role.title}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white/90 font-semibold transition-colors flex items-center justify-center mx-auto"
            >
              <span className="mr-2">←</span>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthSelection;