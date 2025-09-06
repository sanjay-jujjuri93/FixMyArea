import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-400/10 to-cyan-500/10 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-cyan-400/40 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-white/90 font-semibold">💬 Let's Connect</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-8">
          <span className="text-white drop-shadow-2xl">Contact </span>
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          We're here to help and answer any questions you might have
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
