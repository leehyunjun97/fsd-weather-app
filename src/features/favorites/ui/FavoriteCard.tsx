import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { useWeather } from '../../../shared/hooks/useWeather';
import { useFavoritesStore } from '../model/useFavoritesStore';
import { getWeatherDescription } from '../../../shared/lib/weatherTranslator';
import { getWeatherGradient } from '../../../shared/lib/getWeatherGradient';
import { InputModal } from '../../../shared/ui/InputModal';
import { ConfirmModal } from '../../../shared/ui/ConfirmModal';

interface FavoriteCardProps {
  location: FavoriteLocation;
}

export const FavoriteCard = ({ location }: FavoriteCardProps) => {
  const navigate = useNavigate();
  const { removeFavorite, updateAlias } = useFavoritesStore();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data, isLoading } = useWeather({
    lat: location.lat,
    lon: location.lon,
  });

  const bgClass = getWeatherGradient(data?.current.weather[0].id);

  const handleCardClick = () => {
    navigate(`/detail/${location.name.replace(/\s+/g, '-')}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className='w-full h-28 md:h-36 bg-gray-200 rounded-3xl md:rounded-4xl animate-pulse' />
    );
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`relative w-full p-4 md:p-6 h-28 md:h-36 rounded-3xl md:rounded-4xl text-white cursor-pointer transition-all hover:scale-[1.02] active:scale-98 shadow-lg overflow-hidden flex flex-col justify-between ${bgClass}`}
      >
        <div className='absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none' />

        <div className='flex justify-between items-start z-10'>
          <div className='flex items-center gap-2 flex-1 mr-2'>
            <h3 className='text-xl md:text-2xl font-bold truncate max-w-40 md:max-w-60 drop-shadow-md'>
              {location.alias}
            </h3>

            <button
              onClick={handleEditClick}
              className='p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white'
              title='별칭 수정'
            >
              <Edit2 size={16} />
            </button>
          </div>

          <button
            onClick={handleDeleteClick}
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

      <InputModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={(newAlias) => updateAlias(location.id, newAlias)}
        title='별칭 수정'
        description='이 장소의 새로운 이름을 지어주세요.'
        initialValue={location.alias}
        confirmLabel='수정완료'
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => removeFavorite(location.id)}
        title='즐겨찾기 삭제'
        description={`'${location.alias}'을(를) 정말 삭제하시겠습니까?`}
        confirmLabel='삭제'
        isDestructive
      />
    </>
  );
};
