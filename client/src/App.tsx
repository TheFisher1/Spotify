import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LandingPage from './pages/LandingPage';
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTrack, setCurrentTrack] = useState({
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    cover: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
      case 'search':
        return <Search setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
      case 'library':
        return <Library setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
      default:
        return <Home setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
    }
  };
  return <div className="flex flex-col h-screen bg-black text-white">
    <div className="flex flex-1 overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-zinc-800 to-black">
        {renderPage()}
      </main>
    </div>
    <MusicPlayer currentTrack={currentTrack} isPlaying={isPlaying} handlePlayPause={handlePlayPause} />
  </div>;
}