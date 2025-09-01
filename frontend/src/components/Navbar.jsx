import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 p-4 flex justify-between items-center flex-wrap">
      <div className="text-xl font-bold text-gray-800">FixMyArea</div>

      <ul className="flex space-x-2 md:space-x-6 flex-wrap">
        <li><Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors font-medium text-sm md:text-base">Home</Link></li>
        <li><Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors font-medium text-sm md:text-base">About Us</Link></li>
        <li><Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors font-medium text-sm md:text-base">Contact Us</Link></li>
      </ul>

      {user ? (
        <div className="flex items-center space-x-2 md:space-x-4 flex-wrap">
          <Link to="/new-complaint" className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm">
            Report Issue
          </Link>
          <Link to="/dashboard" className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md text-sm">
            Dashboard
          </Link>
          
          <Link to="/profile" className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center font-bold text-sm md:text-lg cursor-pointer shadow-md">
              {getInitials(user?.name)}
            </div>
          </Link>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm">Logout</button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 md:space-x-4 flex-wrap">
          <Link to="/auth-selection" className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm">
            Login
          </Link>
          <Link to="/register-selection" className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors shadow-md text-sm">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;