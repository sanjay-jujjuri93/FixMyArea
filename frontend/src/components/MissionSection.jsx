import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-cyan-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="group relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  Our Mission
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    FixMyArea is a community-driven platform designed to empower citizens to report and resolve civic issues in their local areas. From potholes to broken streetlights, our mission is to create a seamless connection between citizens and local authorities.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    By providing an easy-to-use interface, we aim to make our communities safer, cleaner, and more efficient through the power of technology and collective action.
                  </p>
                  
                  {/* Mission highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-100">
                      <div className="text-2xl mb-2">🏘️</div>
                      <div className="text-sm font-semibold text-gray-800">Community First</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="text-sm font-semibold text-gray-800">Fast Resolution</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                      <div className="text-2xl mb-2">🔍</div>
                      <div className="text-sm font-semibold text-gray-800">Transparency</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
                      <div className="text-2xl mb-2">🤝</div>
                      <div className="text-sm font-semibold text-gray-800">Collaboration</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <img
                      src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=500&q=80"
                      alt="Community collaboration"
                      className="relative rounded-2xl shadow-2xl w-full object-cover transform group-hover:scale-105 transition-all duration-500"
                    />
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce">
                      <span className="text-white text-lg">💡</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                      <span className="text-white">🌟</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
