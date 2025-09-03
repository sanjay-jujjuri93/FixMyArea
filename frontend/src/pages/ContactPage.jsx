// File: frontend/src/pages/ContactPage.jsx

import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
        <p className="text-gray-600 mb-6">
          Have a question or feedback? We'd love to hear from you.
        </p>
        
        <div className="space-y-6">
          {/* Email Section */}
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-1">Email Address</h4>
            <p className="text-blue-500 hover:underline">
              <a href="mailto:sanjayjujjuri9@gmail.com">sanjayjujjuri9@gmail.com</a>
            </p>
          </div>
          
          {/* Phone Section */}
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-1">Phone Number</h4>
            <p className="text-gray-600">+91 9985434455</p>
          </div>
          
          {/* Social Media Section */}
          <div>
            <h4 className="font-semibold text-xl text-gray-700 mb-2">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                <i className="fab fa-twitter mr-2"></i>Twitter
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 font-medium">
                <i className="fab fa-facebook mr-2"></i>Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
