import React from 'react';
import { Features } from '../components/Features';
import { Navigation } from '../components/Navigation';
import { Heroes } from '../components/Heroes';
import { PremiumSection } from '../components/PremiumSection';
import { Footer } from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      <Navigation />
      <Heroes onLogin={() => { }} />
      <Features />
      <PremiumSection onLogin={() => { }} />
      <Footer />
    </div>
  )
};

export default LandingPage;