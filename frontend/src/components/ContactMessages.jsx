import React, { useState, useEffect } from 'react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(storedMessages);
  }, []);

  const clearMessages = () => {
    localStorage.removeItem('contactMessages');
    setMessages([]);
  };

  const exportMessages = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'contact-messages.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (messages.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Contact Messages</h2>
        <p className="text-gray-600">Contact form submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages ({messages.length})</h2>
        <div className="space-x-4">
          <button
            onClick={exportMessages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export Messages
          </button>
          <button
            onClick={clearMessages}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{message.subject}</h3>
                <p className="text-gray-600">From: {message.name} ({message.email})</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessages;
