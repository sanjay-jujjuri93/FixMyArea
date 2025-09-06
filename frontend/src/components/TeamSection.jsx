import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { name: "JUJJURI SANJAY", role: "Lead Developer", emoji: "👨‍💻", color: "from-blue-500 to-cyan-500" },
    { name: "DORA TEJA", role: "Lead Developer", emoji: "👨‍💻", color: "from-purple-500 to-pink-500" },
    { name: "KARTHIK", role: "Backend Engineer", emoji: "⚙️", color: "from-green-500 to-emerald-500" },
    { name: "DURGA PRASAD", role: "System Architect", emoji: "🏗️", color: "from-orange-500 to-red-500" },
    { name: "MADHAN", role: "DevOps Engineer", emoji: "🚀", color: "from-indigo-500 to-purple-500" },
    { name: "NEELIMA REDDY", role: "UI/UX Designer", emoji: "✨", color: "from-pink-500 to-rose-500" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
            <span className="text-2xl text-white">👥</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The passionate individuals behind FixMyArea's success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              {/* Glowing border effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  {/* Avatar */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${member.color} rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{member.emoji}</span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  
                  {/* Role */}
                  <p className="text-white/70 mb-4">
                    {member.role}
                  </p>
                  
                  {/* Decorative line */}
                  <div className={`h-1 w-16 bg-gradient-to-r ${member.color} rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-8 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-white/70">Team Members</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-8 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Dedicated</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-8 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Support</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-8 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-white/70">Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
