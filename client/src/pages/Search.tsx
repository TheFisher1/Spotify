import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import SongCard from '../components/SongCard';
import { Song, Artist, Album, Playlist } from '../types';

interface SearchProps {
  searchResults: {
    songs: Song[];
    albums: Album[];
    playlists: Playlist[];
    artists: Artist[];
  };
  loading: boolean;
  error: string;
  onSearch: (query: string) => void;
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}

interface SearchResult {
  type: 'song' | 'album' | 'playlist' | 'artist';
  id: string;
  title?: string;
  name?: string;
  artist?: Artist;
  description?: string;
  cover?: string;
  image?: string;
  year?: string;
  song?: Song;
}

const Search = ({
  searchResults,
  loading,
  error,
  onSearch,
  setCurrentTrack,
  handlePlayPause
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
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

    const allResults = [
      ...searchResults.songs.map(song => ({
        type: 'song' as const,
        id: song.id?.toString() || '',
        title: song.title,
        artist: song.artist,
        cover: song.thumbnail || song.thumbnail,
        song: song
      })),
      ...searchResults.albums.map(album => ({
        type: 'album' as const,
        id: album.id?.toString() || '',
        title: album.name,
        artist: album.artist,
        cover: album.cover,
        year: album.releaseDate?.split('-')[0]
      })),
      ...searchResults.playlists.map(playlist => ({
        type: 'playlist' as const,
        id: playlist.id?.toString() || '',
        title: playlist.name,
        description: playlist.description,
        cover: playlist.coverUrl
      })),
      ...searchResults.artists.map(artist => ({
        type: 'artist' as const,
        id: artist.id?.toString() || '',
        name: artist.name,
        image: artist.image
      }))
    ];

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{searchQuery}"
        </h2>
        {allResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {allResults.map(item => {
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
                    artist={item.artist}
                    cover={item.cover || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                    year={item.year || '2024'}
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                  />
                );
              } else if (item.type === 'playlist') {
                return (
                  <PlaylistCard
                    id={item.id}
                    key={item.id}
                    title={item.title || ''}
                    description={item.description || ''}
                    setCurrentTrack={setCurrentTrack}
                    handlePlayPause={handlePlayPause}
                    playlist={{
                      id: item.id,
                      name: item.title || '',
                      description: item.description,
                      coverUrl: item.cover
                    }}
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
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-zinc-800 text-white placeholder-zinc-400 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {genres.map(genre => (
              <div
                key={genre.id}
                className={`${genre.color} p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
              >
                <h3 className="font-bold text-lg">{genre.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderSearchResults()}
    </div>
  );
};

export default Search;