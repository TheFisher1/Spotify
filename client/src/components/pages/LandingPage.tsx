import React from 'react';
import { PlayCircleIcon, HeadphonesIcon, RadioIcon, UsersIcon } from 'lucide-react';
interface LandingPageProps {
  onLogin: () => void;
}
const LandingPage: React.FC<LandingPageProps> = ({
  onLogin
}) => {
  return <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Spotify</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-full hover:text-green-500 transition-colors" onClick={onLogin}>
                Log in
              </button>
              <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-400 transition-colors" onClick={onLogin}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Music for everyone.
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-8">
              Millions of songs. No credit card needed.
            </p>
            <button onClick={onLogin} className="bg-green-500 hover:bg-green-400 text-lg font-semibold px-8 py-4 rounded-full transition-colors">
              Get Started
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
      </section>
      {/* Features Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <PlayCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Play Your Music</h3>
              <p className="text-zinc-400">
                Listen to your favorite songs anytime, anywhere.
              </p>
            </div>
            <div className="text-center p-6">
              <HeadphonesIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-zinc-400">
                Enjoy crystal clear sound quality.
              </p>
            </div>
            <div className="text-center p-6">
              <RadioIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Offline Mode</h3>
              <p className="text-zinc-400">Download and listen offline.</p>
            </div>
            <div className="text-center p-6">
              <UsersIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Share Music</h3>
              <p className="text-zinc-400">
                Share your favorite tracks with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Premium Free for 1 Month
              </h2>
              <p className="text-zinc-400 mb-8">
                Just ₹119/month after. Debit and credit cards accepted. Cancel
                anytime.
              </p>
              <div className="space-y-4">
                <button onClick={onLogin} className="w-full md:w-auto bg-green-500 hover:bg-green-400 font-semibold px-8 py-4 rounded-full transition-colors">
                  GET STARTED
                </button>
                <button onClick={onLogin} className="w-full md:w-auto border border-white hover:border-green-500 hover:text-green-500 font-semibold px-8 py-4 rounded-full transition-colors">
                  SEE OTHER PLANS
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3" alt="Premium Music" className="rounded-lg shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button className="hover:text-white">About</button>
                </li>
                <li>
                  <button className="hover:text-white">Jobs</button>
                </li>
                <li>
                  <button className="hover:text-white">For the Record</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Communities</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button className="hover:text-white">For Artists</button>
                </li>
                <li>
                  <button className="hover:text-white">Developers</button>
                </li>
                <li>
                  <button className="hover:text-white">Advertising</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button className="hover:text-white">Support</button>
                </li>
                <li>
                  <button className="hover:text-white">Web Player</button>
                </li>
                <li>
                  <button className="hover:text-white">Mobile App</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button className="hover:text-white">Instagram</button>
                </li>
                <li>
                  <button className="hover:text-white">Twitter</button>
                </li>
                <li>
                  <button className="hover:text-white">Facebook</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-zinc-400 text-sm">
            <p>&copy; 2023 Spotify Clone. For demo purposes only.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default LandingPage;