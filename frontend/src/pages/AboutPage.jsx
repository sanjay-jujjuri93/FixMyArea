import React from 'react';
import BackButton from '../components/BackButton';
import AboutHero from '../components/AboutHero';
import MissionSection from '../components/MissionSection';
import TeamSection from '../components/TeamSection';
import ProcessSection from '../components/ProcessSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <BackButton variant="minimal" />
      </div>
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <ProcessSection />
    </div>
  );
};
export default AboutPage;