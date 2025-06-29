import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import { Sidebar } from './components/Sidebar';
import { MusicPlayer } from './components/MusicPlayer';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { Track, Playlist, Song, formatDuration } from './types';

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
  const { songs, playlists, loading, error, pagination, loadMoreSongs, loadMorePlaylists } = useData();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  React.useEffect(() => {
    setAllSongs(songs);
  }, [songs]);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    try {
      setCurrentTrack(track);
      setIsPlaying(false);
      setCurrentTime(0);

      audioRef.current.src = track.audioUrl || track.cover || '';
      audioRef.current.load();

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const playSongFromPlaylist = async (playlist: Playlist, songIndex: number) => {
    if (!playlist.songs || songIndex >= playlist.songs.length) return;

    const song = playlist.songs[songIndex];
    const track: Track = {
      id: song.id?.toString() || '1',
      title: song.title,
      artist: typeof song.artist === 'string' ? song.artist : song.artist?.name || 'Unknown Artist',
      album: typeof song.album === 'string' ? song.album : song.album?.name || playlist.name,
      duration: formatDuration(song.duration),
      cover: song.thumbnail || playlist.coverUrl || '',
      audioUrl: song.url
    };

    setCurrentPlaylist(playlist);
    setCurrentSongIndex(songIndex);
    await playTrack(track);
  };

  const playSongFromAllSongs = async (songIndex: number) => {
    if (songIndex < 0 || songIndex >= allSongs.length) return;

    const song = allSongs[songIndex];
    const track: Track = {
      id: song.id?.toString() || '1',
      title: song.title,
      artist: typeof song.artist === 'string' ? song.artist : song.artist?.name || 'Unknown Artist',
      album: typeof song.album === 'string' ? song.album : song.album?.name || 'Unknown Album',
      duration: formatDuration(song.duration),
      cover: song.thumbnail || '',
      audioUrl: song.url
    };

    setCurrentPlaylist(null);
    setCurrentSongIndex(songIndex);
    await playTrack(track);
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

    if (currentPlaylist && currentPlaylist.songs) {
      const nextIndex = currentSongIndex + 1;
      if (nextIndex < currentPlaylist.songs.length) {
        playSongFromPlaylist(currentPlaylist, nextIndex);
      }
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentPlaylist(null);
    setCurrentSongIndex(0);
    playTrack(track);
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    playSongFromPlaylist(playlist, 0);
  };

  const onNextTrack = () => {
    if (currentPlaylist && currentPlaylist.songs) {
      const nextIndex = currentSongIndex + 1;
      if (nextIndex < currentPlaylist.songs.length) {
        playSongFromPlaylist(currentPlaylist, nextIndex);
      }
    } else if (allSongs.length > 0) {
      const nextIndex = currentSongIndex + 1;
      if (nextIndex < allSongs.length) {
        playSongFromAllSongs(nextIndex);
      }
    }
  };

  const onPreviousTrack = () => {
    if (currentPlaylist && currentPlaylist.songs) {
      const prevIndex = currentSongIndex - 1;
      if (prevIndex >= 0) {
        playSongFromPlaylist(currentPlaylist, prevIndex);
      }
    } else if (allSongs.length > 0) {
      const prevIndex = currentSongIndex - 1;
      if (prevIndex >= 0) {
        playSongFromAllSongs(prevIndex);
      }
    }
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
                  songs={songs}
                  playlists={playlists}
                  loading={loading}
                  error={error}
                  pagination={pagination}
                  setCurrentTrack={handleTrackSelect}
                  handlePlayPause={togglePlayPause}
                  onPlaylistSelect={handlePlaylistSelect}
                  onLoadMoreSongs={loadMoreSongs}
                  onLoadMorePlaylists={loadMorePlaylists}
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
        onNextTrack={onNextTrack}
        onPreviousTrack={onPreviousTrack}
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
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}