import { Star } from 'lucide-react';
import { useFavoriteAction } from '../model/useFavoriteAction';
import { InputModal } from '../../../shared/ui/InputModal';
import { ConfirmModal } from '../../../shared/ui/ConfirmModal';
import { twMerge } from 'tailwind-merge';

interface AddToFavoriteButtonProps {
  locationName: string | undefined;
  coords: GeoLocation | null;
}

export const AddToFavoriteButton = ({
  locationName,
  coords,
}: AddToFavoriteButtonProps) => {
  const {
    isFavorite,
    handleToggle,
    modalState,
    closeModal,
    confirmAdd,
    confirmRemove,
  } = useFavoriteAction(locationName, coords);

  return (
    <>
      <button
        onClick={handleToggle}
        className={twMerge(
          'absolute right-4 p-2 rounded-full transition-colors cursor-pointer hover:scale-102',
          isFavorite ? 'text-yellow-400 bg-white/10' : 'text-gray-400'
        )}
      >
        <Star fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <InputModal
        isOpen={modalState === 'add'}
        onClose={closeModal}
        onConfirm={confirmAdd}
        title='즐겨찾기 추가'
        description='이 장소의 별명을 입력해주세요.'
        initialValue={locationName}
        confirmLabel='저장'
      />

      <ConfirmModal
        isOpen={modalState === 'remove'}
        onClose={closeModal}
        onConfirm={confirmRemove}
        title='즐겨찾기 삭제'
        description='정말 목록에서 삭제하시겠습니까?'
        confirmLabel='삭제'
        isDestructive
      />
    </>
  );
};
