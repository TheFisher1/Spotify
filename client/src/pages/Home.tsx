import React, { useState, useEffect, useRef } from 'react';
import { mediaService } from '../services/mediaService';
import { Playlist, Song } from '../types';
import { PlaylistCollection } from '../components/PlaylistCollection';
import { SongCollection } from '../components/SongCollection';
import { useAuth } from '../contexts/AuthContext';

interface HomeProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
  onPlaylistSelect?: (playlist: Playlist) => void;
  onSongsLoaded?: (songs: Song[]) => void;
}

const Home: React.FC<HomeProps> = ({
  setCurrentTrack,
  handlePlayPause,
  onPlaylistSelect,
  onSongsLoaded
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const onSongsLoadedRef = useRef(onSongsLoaded);
  onSongsLoadedRef.current = onSongsLoaded;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [playlistsData, songsData] = await Promise.all([
          user?.id ? mediaService.getUserPlaylists(user.id) : mediaService.getAllPlaylists(),
          mediaService.getSongs({ pageSize: 10, pageNumber: 0 })
        ]);

        setPlaylists(playlistsData);
        setSongs(songsData);

        // Notify parent component about loaded songs
        if (onSongsLoadedRef.current) {
          onSongsLoadedRef.current(songsData);
        }
      } catch (err: any) {
        setError('Failed to load content');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Songs</h2>
          <button className="text-sm text-zinc-400 hover:text-white">
            See all
          </button>
        </div>
        {songs.length > 0 ? (
          <SongCollection
            songs={songs}
            setCurrentTrack={setCurrentTrack}
            onNextPage={() => { }}
            onPreviousPage={() => { }}
            handlePlayPause={handlePlayPause}
          />
        ) : (
          <div className="text-zinc-400 text-center py-8">No songs available</div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Playlists</h2>
          <button className="text-sm text-zinc-400 hover:text-white">
            See all
          </button>
        </div>
        {playlists.length > 0 ? (
          <PlaylistCollection
            playlists={playlists}
            setCurrentTrack={setCurrentTrack}
            handlePlayPause={handlePlayPause}
            onPlaylistSelect={onPlaylistSelect}
          />
        ) : (
          <div className="text-zinc-400 text-center py-8">No playlists available</div>
        )}
      </section>
    </div>
  );
};

export default Home;