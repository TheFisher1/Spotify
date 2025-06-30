import { PlayIcon } from 'lucide-react';
import { Song, formatDuration } from '../types';

interface SongCardProps {
    song: Song;
    setCurrentTrack: (track: any) => void;
}

export function SongCard({
    song,
    setCurrentTrack
}: SongCardProps) {

    const handlePlay = () => {
        setCurrentTrack({
            id: song.id?.toString() || '1',
            title: song.title,
            artist: song.artist?.name,
            album: song.album?.name,
            duration: formatDuration(song.duration),
            cover: song.thumbnail || '',
            audioUrl: song.url
        });
    };

    return (
        <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors group relative">
            <div className="relative mb-4">
                <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-full aspect-square object-cover rounded shadow-lg"
                />
                <button
                    onClick={handlePlay}
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-green-400"
                >
                    <PlayIcon className="h-6 w-6 text-black" />
                </button>
            </div>
            <h3 className="font-bold truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 mt-1">
                {typeof song.artist === 'string' ? song.artist : song.artist?.name || 'Unknown Artist'} • {typeof song.album === 'string' ? song.album : song.album?.name || 'Unknown Album'}
            </p>
            {song.duration && (
                <p className="text-xs text-zinc-500 mt-1">{song.duration}</p>
            )}
        </div>
    );
};