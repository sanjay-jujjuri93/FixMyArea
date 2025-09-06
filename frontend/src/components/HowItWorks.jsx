import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: "📝",
    title: "Smart Reporting",
    desc: "AI-powered issue detection with photo analysis and automatic categorization",
    bg: "from-cyan-500 to-blue-600",
    delay: "0s"
  },
  {
    icon: "🤝",
    title: "Community Collaboration", 
    desc: "Real-time voting, comments, and collaborative problem-solving with neighbors",
    bg: "from-purple-500 to-pink-600",
    delay: "0.2s"
  },
  {
    icon: "⚡",
    title: "Instant Resolution",
    desc: "Direct integration with local authorities and transparent tracking system",
    bg: "from-emerald-500 to-teal-600",
    delay: "0.4s"
  }
];

const HowItWorks = () => (
  <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>

    <div className="relative z-10 container mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg mb-8">
          <span className="text-purple-600 font-semibold">⚡ Simple Process</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
          How It
          <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Works</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Simple steps to report and resolve community issues effectively
        </p>
      </div>

      {/* Steps */}
      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="group relative"
            style={{animationDelay: step.delay}}
          >
            {/* Connection Line */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                <div className="flex items-center">
                  <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-lg animate-pulse mx-2"></div>
                  <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Step Card */}
            <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 transition-all duration-700 hover:shadow-3xl hover:-translate-y-8 hover:rotate-2 text-center group-hover:bg-white/90">
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${step.bg} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000`}></div>
              
              {/* Step Number */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                {idx + 1}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-32 h-32 bg-gradient-to-r ${step.bg} rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
                  <span className="text-5xl relative z-10 transform group-hover:scale-125 transition-transform duration-500">
                    {step.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-3xl font-black mb-6 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-8">
                  {step.desc}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-6">
                  <div className={`h-full bg-gradient-to-r ${step.bg} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out shadow-lg`}></div>
                </div>

                {/* Feature Badge */}
                <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${step.bg} bg-opacity-10 rounded-full border-2 border-transparent group-hover:border-current transition-all duration-300`}>
                  <span className="font-bold text-sm bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Step {idx + 1} • Advanced AI
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-black text-white mb-6">
              Ready to Transform Your Community?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of residents already making a difference with our revolutionary platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register-selection"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-purple-600 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center">
                  Get Started Now
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-5 bg-white/10 backdrop-blur-md text-white font-semibold text-xl rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                View Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
