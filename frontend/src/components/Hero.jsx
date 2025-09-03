// File: frontend/src/components/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-white p-12 md:p-20 rounded-xl shadow-lg border border-gray-200 text-center md:text-left">
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-800 leading-tight mb-4">
        Fixing Your Community, <br className="hidden md:block" /> One Report at a Time.
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        An easy and transparent platform to report civic issues and see them get resolved.
      </p>

      {/* Call-to-Action */}
      <Link
        to="/new-complaint"
        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105"
      >
        Report a Problem
      </Link>
    </div>
  );
};

export default Hero;
