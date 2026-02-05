import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Check } from 'lucide-react';
import { useWeather } from '../../../shared/hooks/useWeather';
import { useFavoritesStore } from '../model/useFavoritesStore';
import { getWeatherDescription } from '../../../shared/lib/weatherTranslator';
import { getWeatherGradient } from '../../../shared/lib/getWeatherGradient';
import { useInlineEdit } from '../../../shared/hooks/useInlineEdit';

interface FavoriteCardProps {
  location: FavoriteLocation;
}

export const FavoriteCard = ({ location }: FavoriteCardProps) => {
  const navigate = useNavigate();
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const updateAlias = useFavoritesStore((state) => state.updateAlias);

  const { data, isLoading } = useWeather({
    lat: location.lat,
    lon: location.lon,
  });

  const editLogic = useInlineEdit(location.alias || '', (newAlias) => {
    updateAlias(location.id, newAlias);
  });

  const handleCardClick = () => {
    if (editLogic.isEditing) return;
    navigate(`/detail/${location.name.replace(/\s+/g, '-')}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removeFavorite(location.id);
    }
  };

  const bgClass = getWeatherGradient(data?.current.weather[0].id);

  if (isLoading) {
    return (
      <div className='w-full h-28 md:h-36 bg-gray-200 rounded-3xl md:rounded-4xl animate-pulse' />
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className={`relative w-full p-4 md:p-6 h-28 md:h-36 rounded-3xl md:rounded-4xl text-white cursor-pointer transition-all hover:scale-[1.02] active:scale-98 shadow-lg overflow-hidden flex flex-col justify-between ${bgClass}`}
    >
      <div className='absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none' />

      <div className='flex justify-between items-start z-10'>
        <div className='flex items-center gap-2 flex-1 mr-2'>
          {editLogic.isEditing ? (
            <input
              autoFocus
              value={editLogic.value}
              onChange={(e) => editLogic.setValue(e.target.value)}
              onBlur={editLogic.save}
              onKeyDown={editLogic.handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className='bg-white/20 text-white rounded px-2 py-1 w-full max-w-40 md:max-w-70 outline-none border border-white/30 text-lg md:text-xl font-bold'
            />
          ) : (
            <h3 className='text-xl md:text-2xl font-bold truncate max-w-40 md:max-w-70 drop-shadow-md'>
              {location.alias}
            </h3>
          )}

          <button
            onClick={editLogic.isEditing ? editLogic.save : editLogic.startEdit}
            className='p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white'
            title={editLogic.isEditing ? '저장' : '별칭 수정'}
          >
            {editLogic.isEditing ? <Check size={16} /> : <Edit2 size={16} />}
          </button>
        </div>

        <button
          onClick={handleDelete}
          className='p-1.5 md:p-2 -mr-1 -mt-1 rounded-full hover:bg-black/10 text-white/70 hover:text-white transition-colors'
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className='flex justify-between items-end z-10'>
        <div className='flex flex-col'>
          <span className='text-xs md:text-sm text-white/90 mb-0.5'>
            {location.name}
          </span>
          <span className='text-xs md:text-sm font-medium'>
            {getWeatherDescription(data?.current.weather[0].id ?? 0)}
          </span>
        </div>

        <div className='flex flex-col items-end'>
          <span className='text-3xl md:text-4xl font-light tracking-tighter'>
            {Math.round(data?.current.temp ?? 0)}°
          </span>
          <div className='text-xs md:text-sm text-white/90'>
            최고:{Math.round(data?.daily[0].temp.max ?? 0)}° 최저:
            {Math.round(data?.daily[0].temp.min ?? 0)}°
          </div>
        </div>
      </div>
    </div>
  );
};
