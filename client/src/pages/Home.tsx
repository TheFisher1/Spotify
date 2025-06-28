import React from 'react';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
interface HomeProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}
const Home: React.FC<HomeProps> = ({
  setCurrentTrack,
  handlePlayPause
}) => {
  const featuredPlaylists = [{
    id: '1',
    title: "Today's Top Hits",
    description: 'The Weeknd is on top of the Hottest 50!',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '2',
    title: 'RapCaviar',
    description: 'New music from Drake, Kendrick Lamar and more.',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '3',
    title: 'Rock Classics',
    description: 'Rock legends & epic songs that continue to inspire generations.',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '4',
    title: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits.',
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: '5',
    title: 'Viva Latino',
    description: "Today's top Latin hits, elevando nuestra música.",
    cover: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  const newReleases = [{
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2020'
  }, {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2020'
  }, {
    id: '3',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    cover: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2021'
  }, {
    id: '4',
    title: 'Planet Her',
    artist: 'Doja Cat',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2021'
  }, {
    id: '5',
    title: 'Justice',
    artist: 'Justin Bieber',
    cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    year: '2021'
  }];
  return <div>
    <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Featured Playlists</h2>
        <button className="text-sm text-zinc-400 hover:text-white">
          See all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {featuredPlaylists.map(playlist => <PlaylistCard key={playlist.id} {...playlist} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />)}
      </div>
    </section>
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">New Releases</h2>
        <button className="text-sm text-zinc-400 hover:text-white">
          See all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {newReleases.map(album => <AlbumCard key={album.id} {...album} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />)}
      </div>
    </section>
  </div>;
};
export default Home;