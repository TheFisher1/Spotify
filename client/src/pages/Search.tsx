import { useState, useEffect } from 'react';
import { Song } from '../types';
import { SongCollection } from '../components/SongCollection';
import { mediaService } from '../services/mediaService';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
    setCurrentTrack: (track: any) => void;
    handlePlayPause: () => void;
}

export function Search({ setCurrentTrack, handlePlayPause }: SearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSongs([]);
            setError('');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const songsData = await mediaService.getSongsBySearchQuery(query);
            setSongs(songsData);
        } catch (err) {
            setError((err as any));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                handleSearch(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <div className="space-y-8">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Search</h1>
            </div>

            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                />
            </div>

            {loading && (
                <div className="flex items-center justify-center h-32">
                    <div className="text-xl">Searching...</div>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-32">
                    <div className="text-red-500 text-xl">Failed to find songs. Please try again later...</div>
                </div>
            )}

            {!loading && !error && searchQuery && (
                <>
                    {songs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">
                                Songs ({songs.length} {songs.length === 1 ? 'result' : 'results'})
                            </h2>
                            <SongCollection
                                songs={songs}
                                setCurrentTrack={setCurrentTrack}
                                handlePlayPause={handlePlayPause}
                            />
                        </section>
                    )}

                    {songs.length === 0 && searchQuery && (
                        <div className="text-zinc-400 text-center py-16">
                            <div className="text-xl mb-2">No songs found</div>
                            <div className="text-sm">Try searching for something else</div>
                        </div>
                    )}
                </>
            )}

            {!searchQuery && (
                <div className="text-zinc-400 text-center py-16">
                    <div className="text-xl mb-2">Search for your favorite music</div>
                    <div className="text-sm">Find songs and artists</div>
                </div>
            )}
        </div>
    );
} 