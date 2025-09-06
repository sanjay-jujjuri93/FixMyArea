import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import ComplaintDashboard from "../components/ComplaintDashboard";
import IssueAnalysis from "../components/IssueAnalysis";
import JoinTheMovement from "../components/JoinTheMovement";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Hero + Stats */}
      <Hero />
      <Stats />
      <HowItWorks />

      {/* Analysis Charts */}
      <IssueAnalysis />

      {/* Complaints List - Only show for logged-in users */}
      {user && <ComplaintDashboard />}

      {/* Join the Movement - Show for all users */}
      <JoinTheMovement />
    </div>
  );
};

export default HomePage;
