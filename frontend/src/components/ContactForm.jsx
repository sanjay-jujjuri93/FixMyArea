import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Store message locally for admin to view
    const contactMessage = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Store in localStorage
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
    
    // Send email using Web3Forms (no backend needed)
    try {
      const formData = new FormData();
      formData.append('access_key', '121b233d-a1ef-4510-a8ad-c1002df25fd2');
      formData.append('name', contactMessage.name);
      formData.append('email', contactMessage.email);
      formData.append('subject', `FixMyArea Contact: ${contactMessage.subject}`);
      formData.append('message', contactMessage.message);
      formData.append('from_name', 'FixMyArea Contact Form');
      formData.append('to', 'fixmyarea992@gmail.com'); // Explicitly set recipient

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('Email sent successfully via Web3Forms:', result);
      } else {
        console.error('Web3Forms error:', result);
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Web3Forms service error:', error);
      
      // Fallback: Use mailto as last resort
      const subject = encodeURIComponent(`FixMyArea Contact: ${contactMessage.subject}`);
      const body = encodeURIComponent(
        `Name: ${contactMessage.name}\n` +
        `Email: ${contactMessage.email}\n` +
        `Subject: ${contactMessage.subject}\n\n` +
        `Message:\n${contactMessage.message}`
      );
      
      const mailtoLink = `mailto:fixmyarea992@gmail.com?subject=${subject}&body=${body}`;
      
      // Show option to user
      if (confirm('Email service temporarily unavailable. Would you like to open your email client to send the message?')) {
        window.open(mailtoLink);
      }
    }
    
    alert('✅ Thank you for your message! We have received it and will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-2xl text-white">✉️</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Send Us a <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Message</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="group relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-white font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-white font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-white font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-white font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      📤 Send Message
                      <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">
              By sending this message, you agree to our privacy policy and terms of service.
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center text-white/60">
                <span className="mr-2">🔒</span>
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center text-white/60">
                <span className="mr-2">⚡</span>
                <span className="text-sm">Quick Response</span>
              </div>
              <div className="flex items-center text-white/60">
                <span className="mr-2">💬</span>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
