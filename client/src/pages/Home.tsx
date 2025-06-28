import React, { useState, useEffect } from 'react';
import { mediaService } from '../services/mediaService';
import { Song } from '../types';
import { SongCollection } from '../components/SongCollection';

interface HomeProps {
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}

const Home: React.FC<HomeProps> = ({
  setCurrentTrack,
  handlePlayPause
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const songsData = await mediaService.getSongs({
          pageSize: 10,
          pageNumber: currentPage
        });
        setSongs(songsData);
      } catch (err: any) {
        setError('Failed to load songs');
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Songs</h2>
          <button className="text-sm text-zinc-400 hover:text-white">
            See all
          </button>
        </div>
        {songs.length > 0 ? (
          <SongCollection songs={songs} setCurrentTrack={setCurrentTrack} onNextPage={() => setCurrentPage(x => x + 1)} onPreviousPage={() => setCurrentPage(x => x - 1)} handlePlayPause={handlePlayPause} />
        ) : (
          <div className="text-zinc-400 text-center py-8">No songs available</div>
        )}
      </section>
    </div>
  );
};

export default Home;