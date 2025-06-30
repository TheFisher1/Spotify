import { Playlist } from "../types";
import PlaylistCard from "./PlaylistCard";

interface PlaylistCollectionProps {
    playlists: Playlist[];
    setCurrentTrack: (track: any) => void;
    onPlaylistSelect?: (playlist: Playlist) => void;
}

export function PlaylistCollection({ playlists, setCurrentTrack, onPlaylistSelect }: PlaylistCollectionProps) {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {playlists.map(playlist => (
                    <PlaylistCard
                        id={playlist.id}
                        title={playlist.name}
                        description={playlist.description || 'No description'}
                        setCurrentTrack={setCurrentTrack}
                        playlist={playlist}
                        onPlaylistSelect={onPlaylistSelect}
                    />
                ))}
            </div>
        </div>
    );
} 