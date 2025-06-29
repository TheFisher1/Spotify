import React from 'react';
import { Features } from '../components/Features';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      <Navigation />
      <Features />
      <Footer />
    </div>
  )
};

export default LandingPage;