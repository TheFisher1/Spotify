import { PlayIcon } from 'lucide-react';
import { formatDuration, Playlist } from '../types';
import { mediaService } from '../services/mediaService';

interface PlaylistProps {
  id: string;
  title: string;
  description: string;
  setCurrentTrack: (track: any) => void;
  playlist: Playlist;
  onPlaylistSelect?: (playlist: Playlist) => void;
}

export function PlaylistCard({
  id,
  title,
  description,
  setCurrentTrack,
  playlist,
  onPlaylistSelect
}: PlaylistProps) {
  const handlePlay = async () => {
    try {
      const playlistWithSongs = await mediaService.getPlaylistWithSongs(playlist.id);

      if (onPlaylistSelect) {
        onPlaylistSelect(playlistWithSongs);
      }

      if (playlistWithSongs.songs && playlistWithSongs.songs.length > 0) {
        const firstSong = playlistWithSongs.songs[0];
        setCurrentTrack({
          id: firstSong.id?.toString(),
          title: firstSong.title,
          artist: firstSong.artist?.name ?? 'Unknown Artist',
          album: typeof firstSong.album === 'string' ? firstSong.album : firstSong.album?.name || title,
          duration: formatDuration(firstSong.duration),
          cover: firstSong.thumbnail || playlist.coverUrl || '',
          audioUrl: firstSong.url
        });
      }
    } catch (error) {
      setCurrentTrack(null);
    }
  };

  return (
    <div key={id} className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors group relative">
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={title}
          className="w-full aspect-square object-cover rounded shadow-lg"
          onError={(e) => {
            e.currentTarget.src = '/default-playlist-cover.jpg';
          }}
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-green-400"
        >
          <PlayIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      <h3 className="font-bold truncate">{title}</h3>
      <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{description}</p>
      {playlist?.songs && (
        <p className="text-xs text-zinc-500 mt-1">{playlist.songs.length} songs</p>
      )}
    </div>
  );
};

export default PlaylistCard;