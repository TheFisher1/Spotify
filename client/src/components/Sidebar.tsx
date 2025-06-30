import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon } from 'lucide-react';
import Button from "./Button";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/home' || path === '/') return 'home';
    if (path === '/search') return 'search';
    return 'home';
  };

  const currentPage = getCurrentPage();

  const handleNavigation = (page: string) => {
    navigate(`/${page === 'home' ? 'home' : page}`);
  };

  return (
    <div className="w-64 bg-zinc-900 p-6 h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Spotify</h2>
      </div>

      <nav className="mb-8">
        <ul className="space-y-3">
          <li>
            <Button
              variant="sidebar"
              className={currentPage === 'home' ? 'bg-zinc-800 font-semibold' : ''}
              onClick={() => handleNavigation('home')}
              icon={HomeIcon}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              variant="sidebar"
              className={currentPage === 'search' ? 'bg-zinc-800 font-semibold' : ''}
              onClick={() => handleNavigation('search')}
              icon={SearchIcon}
            >
              Search
            </Button>
          </li>
        </ul>
      </nav>
      <div className="space-y-3 mb-6">
      </div>
    </div>
  );
};