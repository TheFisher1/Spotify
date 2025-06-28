import React from 'react';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon, Repeat2Icon, ShuffleIcon } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl?: string;
  url?: string;
}

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  handlePlayPause: () => void;
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  handlePlayPause,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange
}) => {
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-between">
      <div className="flex items-center w-1/4">
        <img src={currentTrack.cover} alt={currentTrack.title} className="h-14 w-14 rounded mr-3" />
        <div>
          <div className="text-sm font-medium">{currentTrack.title}</div>
          <div className="text-xs text-zinc-400">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center mb-2">
          <button className="text-zinc-400 hover:text-white mx-2">
            <ShuffleIcon className="h-4 w-4" />
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <SkipBackIcon className="h-5 w-5" />
          </button>
          <button className="bg-white text-black rounded-full p-2 mx-2 hover:scale-105" onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <SkipForwardIcon className="h-5 w-5" />
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <Repeat2Icon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center w-full">
          <span className="text-xs text-zinc-400 w-10">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={onSeek}
            className="mx-2 flex-1 h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(currentTime / (duration || 1)) * 100}%, #52525b ${(currentTime / (duration || 1)) * 100}%, #52525b 100%)`
            }}
          />
          <span className="text-xs text-zinc-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-end w-1/4">
        <VolumeIcon className="h-5 w-5 text-zinc-400 mr-2" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="w-24 h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, white 0%, white ${volume * 100}%, #52525b ${volume * 100}%, #52525b 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;