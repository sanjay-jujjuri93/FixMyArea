import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleViewIssuesClick = () => {
    if (user) {
      // If user is logged in, scroll to live issues section
      const element = document.getElementById('complaint-dashboard');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If user is not logged in, redirect to login
      navigate('/auth-selection');
    }
  };

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
    {/* Animated Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
    </div>

    {/* Floating Particles */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400/50 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-pink-400/40 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
    </div>

    <div className="relative z-10 container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 font-semibold">✨ Trusted by Community</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-8">
            <span className="text-white drop-shadow-2xl">Fix</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">My</span>
            <span className="text-white drop-shadow-2xl">Area</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl lg:text-3xl text-white/80 mb-4 font-light">
            Revolutionizing Community Engagement
          </p>
          <p className="text-xl text-white/70 max-w-2xl mb-12 leading-relaxed">
            AI-powered civic issue reporting with real-time tracking, community collaboration, and transparent resolution processes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <button
              onClick={handleViewIssuesClick}
              className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                🚀 View Issues
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('issue-analysis');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold text-xl rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              📊 Analytics
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-xl">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70">Issues Resolved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-xl">
              <div className="text-4xl font-bold text-white mb-2">Fast</div>
              <div className="text-white/70">Response</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-xl">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Available</div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Visual */}
        <div className="flex-1 relative">
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Smart City"
                className="rounded-2xl shadow-2xl w-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
              
              {/* Floating UI Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-white text-2xl">🏠</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl animate-spin" style={{animationDuration: '3s'}}>
                <span className="text-white">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
