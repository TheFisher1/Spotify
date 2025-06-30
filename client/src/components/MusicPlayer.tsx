import React, { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon, Repeat2Icon, ShuffleIcon } from 'lucide-react';
import Button from './Button';
import { Track, Playlist } from '../types';

interface MusicPlayerProps {
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  currentSongIndex: number;
  onTrackEnd?: () => void;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
}

export function MusicPlayer({
  currentTrack,
  onTrackEnd,
  onNextTrack,
  onPreviousTrack
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    try {
      setIsPlaying(false);
      setCurrentTime(0);

      audioRef.current.src = track.audioUrl || track.cover || '';
      audioRef.current.load();

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming track:', error);
      }
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      await resumeTrack();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onTrackEnd) {
      onTrackEnd();
    }
    if (onNextTrack) {
      onNextTrack();
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (currentTrack) {
      playTrack(currentTrack);
    }
  }, [currentTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center w-1/4">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-12 h-12 rounded mr-3" />
          <div>
            <div className="font-medium truncate">{currentTrack.title}</div>
            <div className="text-sm text-zinc-400 truncate">{currentTrack.artist}</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center mb-2">
            <Button variant="icon" size="sm" className="mx-2">
              <ShuffleIcon className="h-4 w-4" />
            </Button>
            <Button variant="icon" size="sm" className="mx-2" onClick={onPreviousTrack}>
              <SkipBackIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="play"
              size="sm"
              onClick={togglePlayPause}
              className="mx-2"
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </Button>
            <Button variant="icon" size="sm" className="mx-2" onClick={onNextTrack}>
              <SkipForwardIcon className="h-5 w-5" />
            </Button>
            <Button variant="icon" size="sm" className="mx-2">
              <Repeat2Icon className="h-4 w-4" />
            </Button>
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
              onChange={handleSeek}
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

        <div className="flex items-center justify-end w-1/4">
          <VolumeIcon className="h-5 w-5 text-zinc-400 mr-2" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, white 0%, white ${volume * 100}%, #52525b ${volume * 100}%, #52525b 100%)`
            }}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
        onError={handleAudioError}
        preload="metadata"
      />
    </>
  );
};