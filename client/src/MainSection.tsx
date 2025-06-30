import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import { Track, Playlist, Song, formatDuration } from './types';
import { mediaService } from './services/mediaService';
import { SpotifyRouter } from './SpotifyRouter';

export function MainSection() {
    const { isAuthenticated, user } = useAuth();

    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [allSongs, setAllSongs] = useState<Song[]>([]);

    useEffect(() => {
        if (user) {
            const fetchAllSongs = async () => {
                try {
                    const songs = await mediaService.getSongs({ pageSize: 5, pageNumber: 0 });
                    setAllSongs(Array.isArray(songs) ? songs : []);
                } catch (error) {
                    console.error('Error fetching all songs:', error);
                }
            };
            fetchAllSongs();
        }
    }, [user]);

    const handleTrackSelect = (track: Track) => {
        setCurrentPlaylist(null);
        const songIndex = allSongs.findIndex(song =>
            song.id?.toString() === track.id || song.title === track.title
        );
        setCurrentSongIndex(songIndex >= 0 ? songIndex : 0);
        setCurrentTrack(track);
    };

    const handlePlaylistSelect = async (playlist: Playlist) => {
        const playlistWithSongs = await mediaService.getPlaylistWithSongs(playlist.id);
        setCurrentPlaylist(playlistWithSongs);
        setCurrentSongIndex(0);

        if (playlistWithSongs.songs && playlistWithSongs.songs.length > 0) {
            const song = playlistWithSongs.songs[0];
            const track: Track = {
                id: song.id?.toString() || '1',
                title: song.title,
                artist: song.artist!.name,
                album: song.album!.name,
                duration: formatDuration(song.duration),
                cover: song.thumbnail || playlistWithSongs.coverUrl || '',
                audioUrl: song.url
            };
            setCurrentTrack(track);
        }
    };

    const handleTrackEnd = () => {
        handleNextTrack();
    };

    const handleNextTrack = () => {
        if (currentPlaylist && currentPlaylist.songs) {
            const nextIndex = currentSongIndex + 1;
            if (nextIndex < currentPlaylist.songs.length) {
                setCurrentSongIndex(nextIndex);
                const song = currentPlaylist.songs[nextIndex];
                const track = {
                    id: song.id?.toString() || '1',
                    title: song.title,
                    artist: song.artist!.name,
                    album: song.album!.name,
                    duration: formatDuration(song.duration),
                    cover: song.thumbnail || currentPlaylist.coverUrl || '',
                    audioUrl: song.url
                };
                setCurrentTrack(track);
            }
        } else if (allSongs.length > 0) {

            const nextIndex = currentSongIndex + 1;
            if (nextIndex < allSongs.length) {
                setCurrentSongIndex(nextIndex);
                const song = allSongs[nextIndex];
                const track = {
                    id: song.id!.toString(),
                    title: song.title,
                    artist: song.artist!.name,
                    album: song.album!.name,
                    duration: formatDuration(song.duration),
                    cover: song.thumbnail || '',
                    audioUrl: song.url
                };
                setCurrentTrack(track);
            } else {
                mediaService.getRandomSong().then(song => setCurrentTrack({
                    id: song.id!.toString(), title: song.title,
                    artist: song.artist!.name,
                    album: song.album!.name,
                    duration: formatDuration(song.duration),
                    cover: song.thumbnail || '',
                    audioUrl: song.url
                }))
            }
        };

    }

    const handlePreviousTrack = () => {
        if (currentPlaylist && currentPlaylist.songs) {
            const prevIndex = currentSongIndex - 1;
            if (prevIndex >= 0) {
                setCurrentSongIndex(prevIndex);
                const song = currentPlaylist.songs[prevIndex];
                const track: Track = {
                    id: song.id?.toString() || '1',
                    title: song.title,
                    artist: song.artist!.name,
                    album: song.album!.name,
                    duration: formatDuration(song.duration),
                    cover: song.thumbnail || currentPlaylist.coverUrl || '',
                    audioUrl: song.url
                };
                setCurrentTrack(track);
            }
        } else if (allSongs.length > 0) {

            const prevIndex = currentSongIndex - 1;
            if (prevIndex >= 0) {
                setCurrentSongIndex(prevIndex);
                const song = allSongs[prevIndex];
                const track: Track = {
                    id: song.id?.toString() || '1',
                    title: song.title,
                    artist: song.artist!.name,
                    album: song.album!.name,
                    duration: formatDuration(song.duration),
                    cover: song.thumbnail || '',
                    audioUrl: song.url
                };
                setCurrentTrack(track);
            }
        }
    };

    if (!isAuthenticated) {
        return <LandingPage />;
    }

    return (
        <SpotifyRouter
            currentTrack={currentTrack}
            currentPlaylist={currentPlaylist}
            currentSongIndex={currentSongIndex}
            setCurrentTrack={setCurrentTrack}
            handleTrackEnd={handleTrackEnd}
            handleTrackSelect={handleTrackSelect}
            handleNextTrack={handleNextTrack}
            handlePreviousTrack={handlePreviousTrack}
            handlePlaylistSelect={handlePlaylistSelect}
        />
    )
}
