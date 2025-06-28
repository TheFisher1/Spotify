import React from 'react';
import { Features } from '../components/Features';
import { Navigation } from '../components/Navigation';
import { Heroes } from '../components/Heroes';
import { PremiumSection } from '../components/PremiumSection';
import { Footer } from '../components/Footer';
interface LandingPageProps {
  onLogin: () => void;
}
const LandingPage: React.FC<LandingPageProps> = ({
  onLogin
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      <Navigation onLogin={onLogin} onSignUp={onLogin}/>
      <Heroes onLogin={onLogin}/>
      <Features/>
      <PremiumSection onLogin={onLogin}/>
      <Footer/>
    </div>
  )
};
export default LandingPage;