import React from 'react';
import PlayButton from './PlayButton';

interface AlbumProps {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: string;
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}

const AlbumCard: React.FC<AlbumProps> = ({
  title,
  artist,
  cover,
  year,
  setCurrentTrack,
  handlePlayPause
}) => {
  const handlePlay = () => {
    setCurrentTrack({
      id: '1',
      title: 'First Track from ' + title,
      artist: artist,
      album: title,
      duration: '3:20',
      cover: cover
    });
    handlePlayPause();
  };

  return <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors group relative">
    <div className="relative mb-4">
      <img src={cover} alt={title} className="w-full aspect-square object-cover rounded shadow-lg" />
      <PlayButton onClick={handlePlay} />
    </div>
    <h3 className="font-bold truncate">{title}</h3>
    <p className="text-sm text-zinc-400 mt-1">
      {year} • {artist}
    </p>
  </div>;
};

export default AlbumCard;