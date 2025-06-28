import { PlayIcon } from 'lucide-react';
interface ArtistProps {
  id: string;
  name: string;
  image: string;
  type: string;
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}
const ArtistCard = ({
  name,
  image,
  type,
  setCurrentTrack,
  handlePlayPause
}: ArtistProps) => {
  const handlePlay = () => {
    setCurrentTrack({
      id: '1',
      title: 'Popular Track',
      artist: name,
      album: 'Greatest Hits',
      duration: '3:20',
      cover: image
    });
    handlePlayPause();
  };
  return <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors group relative">
    <div className="relative mb-4">
      <img src={image} alt={name} className="w-full aspect-square object-cover rounded-full shadow-lg" />
      <button onClick={handlePlay} className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <PlayIcon className="h-6 w-6 text-black" />
      </button>
    </div>
    <h3 className="font-bold text-center truncate">{name}</h3>
    <p className="text-sm text-zinc-400 mt-1 text-center">{type}</p>
  </div>;
};
export default ArtistCard;