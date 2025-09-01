import React from 'react';

const HowItWorks = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a1 1 0 00-1.414-1.414l-6.414 6.414a2 2 0 11-2.828-2.828l6.586-6.586a4 4 0 015.656 0 4 4 0 010 5.656l-6.586 6.586a2 2 0 11-2.828-2.828l6.414-6.414a1 1 0 00-1.414-1.414z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">1. Report an Issue</h3>
          <p className="text-gray-600">
            Citizens can easily submit a new complaint with a photo, location, and a detailed description.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">2. Assign to Worker</h3>
          <p className="text-gray-600">
            Admins review the reported issues and assign them to a local worker based on their location.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">3. Mark as Resolved</h3>
          <p className="text-gray-600">
            The assigned worker resolves the issue and uploads a proof photo to complete the task.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;