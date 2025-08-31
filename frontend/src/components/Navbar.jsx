// File: frontend/src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-blue-700 tracking-tight">
        FixMyArea
      </div>

      {/* Main Nav Links */}
      <ul className="flex space-x-3 md:space-x-6 flex-wrap">
        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      {user ? (
        <div className="flex items-center space-x-3 md:space-x-5 flex-wrap">
          {/* Citizen-only Report Button */}
          {user?.role === "citizen" && (
            <Link
              to="/new-complaint"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm"
            >
              Report Issue
            </Link>
          )}

          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md text-sm"
          >
            Dashboard
          </Link>

          {/* Profile Avatar */}
          <Link to="/profile" className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full h-9 w-9 md:h-11 md:w-11 flex items-center justify-center font-bold text-sm md:text-lg cursor-pointer shadow-lg hover:scale-105 transform transition">
              {getInitials(user?.name)}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3 md:space-x-5 flex-wrap">
          <Link
            to="/auth-selection"
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md text-sm"
          >
            Login
          </Link>
          <Link
            to="/register-selection"
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition shadow-md text-sm"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
