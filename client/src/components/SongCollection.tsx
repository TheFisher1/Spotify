import { Song } from "../types";
import SongCard from "./SongCard";

interface SongCollectionProps {
    songs: Song[];
    setCurrentTrack: (track: any) => void;
    handlePlayPause: () => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

export function SongCollection({ songs, setCurrentTrack, handlePlayPause }: SongCollectionProps) {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {songs.map(song => (
                    <SongCard
                        key={song.id}
                        song={song}
                        setCurrentTrack={setCurrentTrack}
                        handlePlayPause={handlePlayPause}
                    />
                ))}
            </div>
        </div>

    );
}