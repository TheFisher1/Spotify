import React from 'react';
import { Playlist, Song } from '../types';
import { PlaylistCollection } from '../components/PlaylistCollection';
import { SongCollection } from '../components/SongCollection';
import { LogoutButton } from '../components/LogoutButton'

interface HomeProps {
  songs: Song[];
  playlists: Playlist[];
  loading: {
    songs: boolean;
    playlists: boolean;
    albums: boolean;
    artists: boolean;
    search: boolean;
    loadMoreSongs: boolean;
    loadMorePlaylists: boolean;
  };
  error: {
    songs: string;
    playlists: string;
    albums: string;
    artists: string;
    search: string;
  };
  pagination: {
    songs: { pageNumber: number; pageSize: number; hasMore: boolean };
    playlists: { pageNumber: number; pageSize: number; hasMore: boolean };
  };
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
  onPlaylistSelect?: (playlist: Playlist) => void;
  onLoadMoreSongs: () => void;
  onLoadMorePlaylists: () => void;
}

const Home: React.FC<HomeProps> = ({
  songs,
  playlists,
  loading,
  error,
  pagination,
  setCurrentTrack,
  handlePlayPause,
  onPlaylistSelect,
  onLoadMoreSongs,
  onLoadMorePlaylists
}) => {
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
      <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Songs</h2>
          {pagination.songs.hasMore && (
            <button
              className="text-sm text-zinc-400 hover:text-white disabled:opacity-50"
              onClick={onLoadMoreSongs}
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
            handlePlayPause={handlePlayPause}
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
              onClick={onLoadMorePlaylists}
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