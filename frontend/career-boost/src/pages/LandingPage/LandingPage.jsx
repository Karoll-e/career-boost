import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import TechStack from './components/TechStack';
import Benefits from './components/Benefits';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Problem & Solution */}
        <ProblemSolution />
        
        {/* Key Features */}
        <FeaturesSection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Technology Stack */}
        <TechStack />
        
        {/* Benefits */}
        <Benefits />
        
        {/* Final CTA */}
        <FinalCTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;