import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import SongCard from '../components/SongCard';
import { mediaService } from '../services/mediaService';
import { artistService } from '../services/artistService';
import { Song, Album, Playlist, Artist } from '../types';

interface SearchProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}

interface SearchResult {
  type: 'song' | 'album' | 'playlist' | 'artist';
  id: string;
  title?: string;
  name?: string;
  artist?: string;
  description?: string;
  cover?: string;
  image?: string;
  year?: string;
  song?: Song;
}

const Search = ({
  setCurrentTrack,
  handlePlayPause
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genres = [
    { id: '1', name: 'Pop', color: 'bg-purple-600' },
    { id: '2', name: 'Hip-Hop', color: 'bg-orange-600' },
    { id: '3', name: 'Rock', color: 'bg-red-600' },
    { id: '4', name: 'Electronic', color: 'bg-blue-600' },
    { id: '5', name: 'R&B', color: 'bg-pink-600' },
    { id: '6', name: 'Jazz', color: 'bg-yellow-600' },
    { id: '7', name: 'Classical', color: 'bg-green-600' },
    { id: '8', name: 'Country', color: 'bg-teal-600' },
    { id: '9', name: 'Metal', color: 'bg-gray-600' },
    { id: '10', name: 'Folk', color: 'bg-indigo-600' },
    { id: '11', name: 'Reggae', color: 'bg-lime-600' },
    { id: '12', name: 'Punk', color: 'bg-amber-600' }
  ];

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError('');

      const [songs, albums, playlists, artists] = await Promise.all([
        mediaService.searchSongs(searchQuery),
        mediaService.getAllAlbums(), // You might want to add search to albums
        mediaService.getAllPlaylists(), // You might want to add search to playlists
        artistService.getAllArtists() // You might want to add search to artists
      ]);

      const results: SearchResult[] = [];

      // Add songs
      songs.forEach(song => {
        results.push({
          type: 'song',
          id: song.id?.toString() || '',
          title: song.title,
          artist: song.artist,
          cover: song.thumbnail || song.cover,
          song: song
        });
      });

      // Add albums
      albums.forEach(album => {
        results.push({
          type: 'album',
          id: album.id?.toString() || '',
          title: album.title,
          artist: album.artist,
          cover: album.cover,
          year: album.releaseDate?.split('-')[0]
        });
      });

      // Add playlists
      playlists.forEach(playlist => {
        results.push({
          type: 'playlist',
          id: playlist.id?.toString() || '',
          title: playlist.name,
          description: playlist.description,
          cover: playlist.cover
        });
      });

      // Add artists
      artists.forEach(artist => {
        results.push({
          type: 'artist',
          id: artist.id?.toString() || '',
          name: artist.name,
          image: artist.image
        });
      });

      setSearchResults(results);
    } catch (err: any) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (!searchQuery) return null;

    if (loading) {
      return (
        <div className="mt-8">
          <div className="text-center py-8">
            <div className="text-xl">Searching...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-8">
          <div className="text-red-500 text-center py-8">{error}</div>
        </div>
      );
    }

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{searchQuery}"
        </h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {searchResults.map(item => {
              if (item.type === 'song' && item.song) {
                return (
                  <SongCard
                    key={item.id}
                    song={item.song}
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                  />
                );
              } else if (item.type === 'artist') {
                return (
                  <ArtistCard
                    key={item.id}
                    id={item.id}
                    name={item.name || ''}
                    image={item.image || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                    type="Artist"
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                  />
                );
              } else if (item.type === 'album') {
                return (
                  <AlbumCard
                    key={item.id}
                    id={item.id}
                    title={item.title || ''}
                    artist={item.artist || ''}
                    cover={item.cover || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                    year={item.year || '2024'}
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                  />
                );
              } else if (item.type === 'playlist') {
                return (
                  <PlaylistCard
                    key={item.id}
                    id={item.id}
                    title={item.title || ''}
                    description={item.description || ''}
                    cover={item.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="text-zinc-400 text-center py-8">No results found</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-zinc-800 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {renderSearchResults()}

      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {genres.map(genre => (
              <div
                key={genre.id}
                className={`${genre.color} rounded-lg h-40 flex items-center justify-center p-4 hover:brightness-110 cursor-pointer`}
              >
                <h3 className="text-xl font-bold">{genre.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;