import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Home from "./pages/Home";
import { Search } from "./pages/Search";
import { MusicPlayer } from "./components/MusicPlayer";
import { Playlist, Track } from "./types";

interface SpotifyRouterProps {
    currentTrack: any;
    currentPlaylist: any;
    currentSongIndex: number;
    setCurrentTrack: (track: any) => void;
    handleTrackEnd: () => void;
    handleTrackSelect: (track: Track) => void;
    handleNextTrack: () => void;
    handlePreviousTrack: () => void;
    handlePlaylistSelect: (playlist: Playlist) => void;
}

export function SpotifyRouter({
    currentTrack,
    currentPlaylist,
    currentSongIndex,
    handleTrackEnd,
    handleTrackSelect,
    handleNextTrack,
    handlePreviousTrack,
    handlePlaylistSelect,
}: SpotifyRouterProps) {
    return (
        <div className="flex flex-col h-screen bg-black text-white">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-zinc-800 to-black">
                    <Routes>
                        <Route
                            path="/home"
                            element={
                                <Home
                                    setCurrentTrack={handleTrackSelect}
                                    onPlaylistSelect={handlePlaylistSelect}
                                />
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <Search
                                    setCurrentTrack={handleTrackSelect}
                                />
                            }
                        />
                        <Route path="/" element={<Navigate to="/home" replace />} />
                    </Routes>
                </main>
            </div>

            <MusicPlayer
                currentTrack={currentTrack}
                currentPlaylist={currentPlaylist}
                currentSongIndex={currentSongIndex}
                onTrackEnd={handleTrackEnd}
                onNextTrack={handleNextTrack}
                onPreviousTrack={handlePreviousTrack}
            />
        </div>
    );
}