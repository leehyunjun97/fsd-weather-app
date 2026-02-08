import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { useState } from 'react';
import GlobalSearch from '../features/search/ui/GlobalSearch';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300'>
      <div className='layout-width flex flex-col px-4'>
        <div className='flex h-14 items-center justify-between'>
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-2 transition-opacity hover:opacity-70 cursor-pointer'
          >
            <h1 className='text-xl font-extrabold tracking-tighter text-gray-900'>
              REAL<span className='text-gray-400'>TEETH</span>
            </h1>
          </button>

          <div className='flex items-center gap-1'>
            <button
              onClick={() => {
                if (location.pathname !== '/favorites') {
                  navigate('/favorites');
                }
              }}
              className='btn-icon'
              aria-label='즐겨찾기'
            >
              <Star size={20} />
            </button>

            <button
              data-search-trigger='true'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`btn-icon transition-colors ${isSearchOpen && 'bg-gray-100'}`}
              aria-label='검색'
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <GlobalSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </header>
  );
}
