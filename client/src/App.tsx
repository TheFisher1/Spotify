import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Search from './pages/Search';
import Library from './pages/Library';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { Track } from './types';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export function AppContent() {
  const { isAuthenticated } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    try {
      setCurrentTrack(track);
      setIsPlaying(false);
      setCurrentTime(0);

      audioRef.current.src = track.audioUrl || track.url || '';
      audioRef.current.load();

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming track:', error);
      }
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      await resumeTrack();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleAudioError = () => {
    setIsPlaying(false);
  };

  const handleTrackSelect = (track: Track) => {
    playTrack(track);
  };

  const handleNextTrack = () => {
    console.log('Next track clicked');
  };

  const handlePreviousTrack = () => {
    console.log('Previous track clicked');
  };

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-zinc-800 to-black">
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  setCurrentTrack={handleTrackSelect}
                  handlePlayPause={togglePlayPause}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  setCurrentTrack={handleTrackSelect}
                  handlePlayPause={togglePlayPause}
                />
              }
            />
            <Route
              path="/library"
              element={
                <Library
                  setCurrentTrack={handleTrackSelect}
                  handlePlayPause={togglePlayPause}
                />
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>

      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onNextTrack={handleNextTrack}
        onPreviousTrack={handlePreviousTrack}
      />

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
        onError={handleAudioError}
        preload="metadata"
      />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}