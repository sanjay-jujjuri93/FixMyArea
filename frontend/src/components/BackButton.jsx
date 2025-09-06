import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  className = "", 
  text = "Back", 
  icon = true, 
  variant = "default" 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const baseClasses = "inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105";
  
  const variants = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30",
    solid: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl",
    minimal: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
  };

  return (
    <button
      onClick={handleBack}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      )}
      <span>{text}</span>
    </button>
  );
};

export default BackButton;
