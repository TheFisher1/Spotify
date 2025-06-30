import { useState, useEffect } from 'react';
import { Playlist, Song } from '../types';
import { PlaylistCollection } from '../components/PlaylistCollection';
import { SongCollection } from '../components/SongCollection';
import Button from '../Button';
import { useAuth } from '../contexts/AuthContext';
import { mediaService } from '../services/mediaService';

interface HomeProps {
  setCurrentTrack: (track: any) => void;
  onPlaylistSelect?: (playlist: Playlist) => void;
}

export function Home({
  setCurrentTrack,
  onPlaylistSelect
}: HomeProps) {
  const { user, logout } = useAuth();

  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [loading, setLoading] = useState({
    songs: false,
    playlists: false,
    loadMoreSongs: false,
    loadMorePlaylists: false
  });

  const [error, setError] = useState({
    songs: '',
    playlists: ''
  });

  const [pagination, setPagination] = useState({
    songs: { pageNumber: 0, pageSize: 5, hasMore: true },
    playlists: { pageNumber: 0, pageSize: 10, hasMore: true }
  });

  const fetchSongs = async (pageSize: number = 5, pageNumber: number = 0, append: boolean = false) => {
    try {
      setLoading(prev => ({ ...prev, songs: true }));
      setError(prev => ({ ...prev, songs: '' }));

      const songsData = await mediaService.getSongs({ pageSize, pageNumber });
      const validSongs = Array.isArray(songsData) ? songsData : [];

      if (append) {
        setSongs(prev => [...prev, ...validSongs]);
      } else {
        setSongs(validSongs);
      }

      setPagination(prev => ({
        ...prev,
        songs: {
          ...prev.songs,
          pageNumber,
          hasMore: validSongs.length === pageSize
        }
      }));
    } catch (err: any) {
      setError(prev => ({ ...prev, songs: 'Failed to load songs' }));
      console.error('Error fetching songs:', err);
      if (!append) {
        setSongs([]);
      }
    } finally {
      setLoading(prev => ({ ...prev, songs: false }));
    }
  };

  const fetchPlaylists = async (pageSize: number = 10, pageNumber: number = 0, append: boolean = false) => {
    try {
      setLoading(prev => ({ ...prev, playlists: true }));
      setError(prev => ({ ...prev, playlists: '' }));

      const playlistsData = await mediaService.getUserPlaylists(user?.id!, pageNumber, pageSize);
      const validPlaylists = Array.isArray(playlistsData) ? playlistsData : [];

      if (append) {
        setPlaylists(prev => [...prev, ...validPlaylists]);
      } else {
        setPlaylists(validPlaylists);
      }

      setPagination(prev => ({
        ...prev,
        playlists: {
          ...prev.playlists,
          pageNumber,
          hasMore: validPlaylists.length === pageSize
        }
      }));
    } catch (err: any) {
      setError(prev => ({ ...prev, playlists: 'Failed to load playlists' }));
      if (!append) {
        setPlaylists([]);
      }
    } finally {
      setLoading(prev => ({ ...prev, playlists: false }));
    }
  };

  const loadMoreSongs = async () => {
    if (loading.loadMoreSongs || !pagination.songs.hasMore) return;

    try {
      setLoading(prev => ({ ...prev, loadMoreSongs: true }));
      const nextPage = pagination.songs.pageNumber + 1;
      await fetchSongs(pagination.songs.pageSize, nextPage, true);
    } catch (err: any) {
      console.error('Error loading more songs:', err);
    } finally {
      setLoading(prev => ({ ...prev, loadMoreSongs: false }));
    }
  };

  const loadMorePlaylists = async () => {
    if (loading.loadMorePlaylists || !pagination.playlists.hasMore) return;

    try {
      setLoading(prev => ({ ...prev, loadMorePlaylists: true }));
      const nextPage = pagination.playlists.pageNumber + 1;
      await fetchPlaylists(pagination.playlists.pageSize, nextPage, true);
    } catch (err: any) {
      console.error('Error loading more playlists:', err);
    } finally {
      setLoading(prev => ({ ...prev, loadMorePlaylists: false }));
    }
  };

  useEffect(() => {
    if (user) {
      fetchSongs();
      fetchPlaylists();
    }
  }, [user]);

  if (loading.songs || loading.playlists) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error.songs || error.playlists) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-xl">
          {error.songs || error.playlists}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-3xl font-bold">Good afternoon</h1>
        <Button variant='secondary' onClick={logout}>Log Out</Button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Songs</h2>
          {pagination.songs.hasMore && (
            <button
              className="text-sm text-zinc-400 hover:text-white disabled:opacity-50"
              onClick={loadMoreSongs}
              disabled={loading.loadMoreSongs}
            >
              {loading.loadMoreSongs ? 'Loading...' : 'See more'}
            </button>
          )}
        </div>
        {songs.length > 0 ? (
          <SongCollection
            songs={songs}
            setCurrentTrack={setCurrentTrack}
          />
        ) : (
          <div className="text-zinc-400 text-center py-8">No songs available</div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Playlists</h2>
          {pagination.playlists.hasMore && (
            <button
              className="text-sm text-zinc-400 hover:text-white disabled:opacity-50"
              onClick={loadMorePlaylists}
              disabled={loading.loadMorePlaylists}
            >
              {loading.loadMorePlaylists ? 'Loading...' : 'See more'}
            </button>
          )}
        </div>
        {playlists.length > 0 ? (
          <PlaylistCollection
            playlists={playlists}
            setCurrentTrack={setCurrentTrack}
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