import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import PlaylistCard from '../PlaylistCard';
import AlbumCard from '../AlbumCard';
import ArtistCard from '../ArtistCard';
interface SearchProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}
const Search: React.FC<SearchProps> = ({
  setCurrentTrack,
  handlePlayPause
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const genres = [{
    id: '1',
    name: 'Pop',
    color: 'bg-purple-600'
  }, {
    id: '2',
    name: 'Hip-Hop',
    color: 'bg-orange-600'
  }, {
    id: '3',
    name: 'Rock',
    color: 'bg-red-600'
  }, {
    id: '4',
    name: 'Electronic',
    color: 'bg-blue-600'
  }, {
    id: '5',
    name: 'R&B',
    color: 'bg-pink-600'
  }, {
    id: '6',
    name: 'Jazz',
    color: 'bg-yellow-600'
  }, {
    id: '7',
    name: 'Classical',
    color: 'bg-green-600'
  }, {
    id: '8',
    name: 'Country',
    color: 'bg-teal-600'
  }, {
    id: '9',
    name: 'Metal',
    color: 'bg-gray-600'
  }, {
    id: '10',
    name: 'Folk',
    color: 'bg-indigo-600'
  }, {
    id: '11',
    name: 'Reggae',
    color: 'bg-lime-600'
  }, {
    id: '12',
    name: 'Punk',
    color: 'bg-amber-600'
  }];
  const searchResults = [{
    type: 'artist',
    id: '1',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    type2: 'Artist'
  }, {
    type: 'album',
    id: '2',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2020'
  }, {
    type: 'playlist',
    id: '3',
    title: 'This is The Weeknd',
    description: 'All his biggest hits, including tracks from his new album.',
    cover: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  const renderSearchResults = () => {
    if (!searchQuery) return null;
    return <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{searchQuery}"
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {searchResults.map(item => {
          if (item.type === 'artist') {
            return <ArtistCard key={item.id} id={item.id} name={item.name} image={item.image} type={item.type2} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
          } else if (item.type === 'album') {
            return <AlbumCard key={item.id} id={item.id} title={item.title} artist={item.artist} cover={item.cover} year={item.year} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
          } else {
            return <PlaylistCard key={item.id} id={item.id} title={item.title} description={item.description} cover={item.cover} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />;
          }
        })}
        </div>
      </div>;
  };
  return <div>
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="What do you want to listen to?" className="w-full bg-zinc-800 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>
      {renderSearchResults()}
      {!searchQuery && <div>
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {genres.map(genre => <div key={genre.id} className={`${genre.color} rounded-lg h-40 flex items-center justify-center p-4 hover:brightness-110 cursor-pointer`}>
                <h3 className="text-xl font-bold">{genre.name}</h3>
              </div>)}
          </div>
        </div>}
    </div>;
};
export default Search;