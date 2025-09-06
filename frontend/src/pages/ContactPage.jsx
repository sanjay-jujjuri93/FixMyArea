import React from 'react';
import ContactForm from '../components/ContactForm';
import BackButton from '../components/BackButton';
import ContactInfo from '../components/ContactInfo';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-8">
        <BackButton variant="default" />
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};
export default ContactPage;