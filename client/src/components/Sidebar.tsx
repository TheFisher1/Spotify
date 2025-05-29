import React from 'react';
import { HomeIcon, SearchIcon, LibraryIcon, PlusSquareIcon, HeartIcon } from 'lucide-react';
interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage
}) => {
  return <div className="w-64 bg-black flex-shrink-0 flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Spotify</h1>
        <nav className="mb-8">
          <ul className="space-y-3">
            <li>
              <button className={`flex items-center w-full p-2 rounded-md ${currentPage === 'home' ? 'bg-zinc-800 font-semibold' : 'hover:bg-zinc-800'}`} onClick={() => setCurrentPage('home')}>
                <HomeIcon className="h-6 w-6 mr-3" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button className={`flex items-center w-full p-2 rounded-md ${currentPage === 'search' ? 'bg-zinc-800 font-semibold' : 'hover:bg-zinc-800'}`} onClick={() => setCurrentPage('search')}>
                <SearchIcon className="h-6 w-6 mr-3" />
                <span>Search</span>
              </button>
            </li>
            <li>
              <button className={`flex items-center w-full p-2 rounded-md ${currentPage === 'library' ? 'bg-zinc-800 font-semibold' : 'hover:bg-zinc-800'}`} onClick={() => setCurrentPage('library')}>
                <LibraryIcon className="h-6 w-6 mr-3" />
                <span>Your Library</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="space-y-3 mb-6">
          <button className="flex items-center w-full p-2 rounded-md hover:bg-zinc-800">
            <PlusSquareIcon className="h-6 w-6 mr-3" />
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-md hover:bg-zinc-800">
            <HeartIcon className="h-6 w-6 mr-3" />
            <span>Liked Songs</span>
          </button>
        </div>
      </div>
      <div className="border-t border-zinc-800 mt-2 p-6">
        <div className="text-xs text-zinc-400 mb-4">Playlists</div>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="hover:text-white cursor-pointer">My Playlist #1</li>
          <li className="hover:text-white cursor-pointer">Chill Vibes</li>
          <li className="hover:text-white cursor-pointer">Workout Mix</li>
          <li className="hover:text-white cursor-pointer">Study Music</li>
          <li className="hover:text-white cursor-pointer">Road Trip</li>
        </ul>
      </div>
    </div>;
};
export default Sidebar;