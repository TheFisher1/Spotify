import React, { useEffect, useState } from 'react';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon, Repeat2Icon, ShuffleIcon } from 'lucide-react';
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}
interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  handlePlayPause: () => void;
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  handlePlayPause
}) => {
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 200; // Simulating track duration in seconds
  // For visual progress updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  return <div className="h-20 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-between">
      {/* Track Info */}
      <div className="flex items-center w-1/4">
        <img src={currentTrack.cover} alt={currentTrack.title} className="h-14 w-14 rounded mr-3" />
        <div>
          <div className="text-sm font-medium">{currentTrack.title}</div>
          <div className="text-xs text-zinc-400">{currentTrack.artist}</div>
        </div>
      </div>
      {/* Player Controls */}
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
          <div className="mx-2 flex-1 h-1 bg-zinc-600 rounded-full">
            <div className="h-full bg-white rounded-full relative" style={{
            width: `${currentTime / totalTime * 100}%`
          }}>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100"></div>
            </div>
          </div>
          <span className="text-xs text-zinc-400 w-10">
            {currentTrack.duration}
          </span>
        </div>
      </div>
      {/* Volume Control */}
      <div className="flex items-center justify-end w-1/4">
        <VolumeIcon className="h-5 w-5 text-zinc-400 mr-2" />
        <div className="w-24 h-1 bg-zinc-600 rounded-full">
          <div className="h-full bg-white rounded-full" style={{
          width: `${volume}%`
        }}></div>
        </div>
      </div>
    </div>;
};
export default MusicPlayer;