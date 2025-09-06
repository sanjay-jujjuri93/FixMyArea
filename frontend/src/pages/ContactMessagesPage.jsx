import React from 'react';
import ContactMessages from '../components/ContactMessages';

const ContactMessagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <ContactMessages />
      </div>
    </div>
  );
};

export default ContactMessagesPage;
