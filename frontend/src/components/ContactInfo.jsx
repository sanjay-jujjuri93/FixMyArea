import React from 'react';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      value: "fixmyarea992@gmail.com",
      description: "Get in touch via email for detailed inquiries",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-100"
    },
    {
      icon: "📱",
      title: "Call Us",
      value: "+91 9985434455",
      description: "Speak directly with our support team",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-100"
    },
    {
      icon: "🏢",
      title: "Visit Us",
      value: "Parul University",
      description: "Vadodara, Gujarat",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-100"
    }
  ];

  const quickLinks = [
    { icon: "❓", title: "FAQ", description: "Find answers to common questions" },
    { icon: "📖", title: "Documentation", description: "Learn how to use our platform" },
    { icon: "🐛", title: "Report Bug", description: "Help us improve by reporting issues" },
    { icon: "💡", title: "Feature Request", description: "Suggest new features" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-cyan-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="group relative">
                {/* Glowing border effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${method.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
                
                <div className={`relative bg-gradient-to-br ${method.bgColor} backdrop-blur-xl rounded-2xl p-8 border ${method.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                  <div className="text-center">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl text-white">{method.icon}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {method.title}
                    </h3>
                    
                    {/* Value */}
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {method.value}
                    </p>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm">
                      {method.description}
                    </p>
                    
                    {/* Decorative line */}
                    <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${method.color} rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Quick Help
            </h3>
            <p className="text-gray-600">Find what you're looking for quickly</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <div key={index} className="group relative">
                <button
                  onClick={() => {
                    switch(link.title) {
                      case 'FAQ':
                        alert('FAQ section coming soon!');
                        break;
                      case 'Documentation':
                        alert('Documentation will be available soon!');
                        break;
                      case 'Report Bug':
                        window.location.href = '/contact';
                        break;
                      case 'Feature Request':
                        window.location.href = '/contact';
                        break;
                      default:
                        break;
                    }
                  }}
                  className="w-full relative bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{link.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-2">{link.title}</h4>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Response Time Promise */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl">
              <span className="mr-3">⚡</span>
              We typically respond within 24 hours
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
