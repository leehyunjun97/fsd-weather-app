import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../features/favorites/model/useFavoritesStore';
import { ArrowLeft } from 'lucide-react';
import { FavoriteCard } from '../../features/favorites/ui/FavoriteCard';
import { FavoritesEmpty } from './ui/FavoritesEmpty';

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-screen pb-10 animate-in fade-in duration-500'>
      <header className='flex items-center justify-between pb-4 px-1'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ArrowLeft size={28} className='text-gray-800' />
          </button>
        </div>
      </header>

      {favorites.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <div className='flex flex-col gap-4'>
          {favorites.map((location) => (
            <FavoriteCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  );
}
