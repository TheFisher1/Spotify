import React, { useState } from 'react';
import { ListFilterIcon, GridIcon, ClockIcon } from 'lucide-react';

interface LibraryProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}

const Library: React.FC<LibraryProps> = ({
  setCurrentTrack,
  handlePlayPause
}) => {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('playlists');
  const playlists = [{
    id: '1',
    title: 'Liked Songs',
    owner: 'You',
    tracks: 124,
    lastPlayed: '2 days ago',
    cover: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '2',
    title: 'Your Top Songs 2022',
    owner: 'Spotify',
    tracks: 100,
    lastPlayed: '1 week ago',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '3',
    title: 'Discover Weekly',
    owner: 'Spotify',
    tracks: 30,
    lastPlayed: '3 days ago',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '4',
    title: 'Running Mix',
    owner: 'You',
    tracks: 45,
    lastPlayed: 'Yesterday',
    cover: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '5',
    title: 'Throwback Thursday',
    owner: 'Spotify',
    tracks: 50,
    lastPlayed: '2 weeks ago',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '6',
    title: 'Chill Vibes',
    owner: 'You',
    tracks: 67,
    lastPlayed: '4 days ago',
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  const handlePlay = (playlist: any) => {
    setCurrentTrack({
      id: '1',
      title: 'First Track from ' + playlist.title,
      artist: playlist.owner,
      album: playlist.title,
      duration: '3:20',
      cover: playlist.cover
    });
    handlePlayPause();
  };
  const renderGridView = () => {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists.map(playlist => <div key={playlist.id} className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer" onClick={() => handlePlay(playlist)}>
            <div className="mb-4">
              <img src={playlist.cover} alt={playlist.title} className="w-full aspect-square object-cover rounded shadow-lg" />
            </div>
            <h3 className="font-bold truncate">{playlist.title}</h3>
            <p className="text-sm text-zinc-400 mt-1 truncate">
              By {playlist.owner} • {playlist.tracks} songs
            </p>
          </div>)}
      </div>;
  };
  const renderListView = () => {
    return <div className="bg-zinc-900 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Tracks</th>
              <th className="py-3 px-4">Last played</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist, index) => <tr key={playlist.id} className="border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer" onClick={() => handlePlay(playlist)}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <img src={playlist.cover} alt={playlist.title} className="w-10 h-10 mr-3 rounded" />
                    {playlist.title}
                  </div>
                </td>
                <td className="py-3 px-4 text-zinc-400">{playlist.owner}</td>
                <td className="py-3 px-4 text-zinc-400">{playlist.tracks}</td>
                <td className="py-3 px-4 text-zinc-400">
                  {playlist.lastPlayed}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>;
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-zinc-800 rounded-full p-1 flex">
            <button className={`rounded-full p-2 ${view === 'grid' ? 'bg-zinc-700' : ''}`} onClick={() => setView('grid')}>
              <GridIcon className="h-5 w-5" />
            </button>
            <button className={`rounded-full p-2 ${view === 'list' ? 'bg-zinc-700' : ''}`} onClick={() => setView('list')}>
              <ListFilterIcon className="h-5 w-5" />
            </button>
          </div>
          <button className="flex items-center space-x-1 bg-zinc-800 rounded-full px-3 py-1">
            <ListFilterIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex space-x-2">
          <button className={`rounded-full px-4 py-1 ${filter === 'playlists' ? 'bg-white text-black' : 'bg-zinc-800'}`} onClick={() => setFilter('playlists')}>
            Playlists
          </button>
          <button className={`rounded-full px-4 py-1 ${filter === 'artists' ? 'bg-white text-black' : 'bg-zinc-800'}`} onClick={() => setFilter('artists')}>
            Artists
          </button>
          <button className={`rounded-full px-4 py-1 ${filter === 'albums' ? 'bg-white text-black' : 'bg-zinc-800'}`} onClick={() => setFilter('albums')}>
            Albums
          </button>
        </div>
      </div>
      <div className="mb-4 flex items-center text-zinc-400">
        <ClockIcon className="h-4 w-4 mr-2" />
        <span>Recently played</span>
      </div>
      {view === 'grid' ? renderGridView() : renderListView()}
    </div>;
};
export default Library;