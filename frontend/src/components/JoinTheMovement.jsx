import React from 'react';
import { Link } from 'react-router-dom';

const JoinTheMovement = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black text-white mb-6">
                Join the Movement
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Every voice matters. Report issues, support your neighbors, and build a better community together.
              </p>
              
              <Link
                to="/new-complaint"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-emerald-600 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center">
                  🏘️ Report Issue Now
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTheMovement;
