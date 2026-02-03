import { useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md'>
      <div className='layout-width flex h-14 items-center justify-between px-4'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-2 transition-opacity hover:opacity-70'
        >
          <h1 className='text-xl font-extrabold tracking-tighter text-gray-900'>
            REAL<span className='text-gray-400'>TEETH</span>
          </h1>
        </button>

        <div className='flex items-center gap-1'>
          <button className='btn-icon' aria-label='즐겨찾기'>
            <Star size={20} />
          </button>

          <button className='btn-icon' aria-label='검색'>
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
