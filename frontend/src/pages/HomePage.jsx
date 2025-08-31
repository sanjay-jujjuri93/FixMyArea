// File: frontend/src/pages/HomePage.jsx

import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import ComplaintDashboard from '../components/ComplaintDashboard';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero + Stats in a 2-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
        <Hero />
        <Stats />
      </div>

      {/* Complaints Dashboard Section */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
          Latest Complaints
        </h2>
        <ComplaintDashboard />
      </section>

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
};

export default HomePage;
