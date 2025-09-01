import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    "JUJJURI SANJAY",
    "DORA TEJA",
    "KARTHIK",
    "DURGA PRASAD",
    "MADHAN",
    "NEELIMA REDDY"
  ];

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About FixMyArea</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          FixMyArea is a community-driven platform designed to empower citizens to report and resolve civic issues in their local areas. From potholes to broken streetlights, our mission is to create a seamless connection between citizens and local authorities. By providing an easy-to-use interface, we aim to make our communities safer, cleaner, and more efficient.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {teamMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">How It Works</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Citizens can easily report issues by uploading a photo and location.</li>
          <li>Complaints are categorized for quick identification and management.</li>
          <li>Municipal officers (Admins) can assign these tasks to field workers.</li>
          <li>Field workers update the status and upload proof photos once the issue is resolved.</li>
        </ul>
      </div>
    </div>
  );
};
export default AboutPage;