// frontend/src/pages/AuthSelection.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AuthSelection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center border border-gray-200">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Who are you?</h2>

        {/* Role Selection Buttons */}
        <div className="space-y-4">
          <Link
            to="/login/citizen"
            className="block w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Citizen
          </Link>
          <Link
            to="/login/worker"
            className="block w-full px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Worker
          </Link>
          <Link
            to="/login/admin"
            className="block w-full px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-colors shadow-md"
          >
            Admin
          </Link>
        </div>

        {/* Registration Link */}
        <p className="mt-6 text-gray-500 text-sm">
          New here?{' '}
          <Link to="/register-selection" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSelection;
