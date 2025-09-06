import React from 'react';

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Report Issues",
      description: "Citizens can easily report issues by uploading a photo and location.",
      icon: "📸",
      color: "from-cyan-500 to-blue-500"
    },
    {
      number: "02",
      title: "Smart Categorization",
      description: "Complaints are categorized for quick identification and management.",
      icon: "🏷️",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Task Assignment",
      description: "Municipal officers (Admins) can assign these tasks to field workers.",
      icon: "👨‍💼",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "04",
      title: "Resolution & Proof",
      description: "Field workers update the status and upload proof photos once the issue is resolved.",
      icon: "✅",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-cyan-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
            <span className="text-2xl text-white">⚙️</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Our streamlined process ensures efficient issue resolution
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 z-0"></div>
                )}
                
                {/* Step card */}
                <div className="relative">
                  {/* Glowing border effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {/* Step number */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl mb-6 shadow-lg`}>
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-4">{step.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Decorative bottom accent */}
                    <div className={`mt-6 h-1 w-full bg-gradient-to-r ${step.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <button
              onClick={() => {
                window.location.href = '/dashboard';
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="mr-3">🚀</span>
              Start Reporting Issues Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
