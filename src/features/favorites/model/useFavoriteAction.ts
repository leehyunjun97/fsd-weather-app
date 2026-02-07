import { useState } from 'react';
import { useFavoritesStore } from './useFavoritesStore';

const MAX_FAVORITES = 6;

export const useFavoriteAction = (
  locationName: string | undefined,
  coords: GeoLocation | null
) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const [modalState, setModalState] = useState<'none' | 'add' | 'remove'>(
    'none'
  );

  const currentId = coords
    ? `${coords.lat.toFixed(4)}-${coords.lon.toFixed(4)}`
    : null;
  const isFavorite = currentId
    ? favorites.some((fav) => fav.id === currentId)
    : false;

  const handleToggle = () => {
    if (!coords || !currentId || !locationName) return;

    if (isFavorite) {
      setModalState('remove');
    } else {
      if (favorites.length >= MAX_FAVORITES) {
        alert(`최대 ${MAX_FAVORITES}개까지만 저장 가능합니다.`);
        return;
      }
      setModalState('add');
    }
  };

  const confirmAdd = (alias: string) => {
    if (!coords || !currentId || !locationName) return;
    addFavorite({
      id: currentId,
      name: locationName,
      alias: alias || locationName,
      lat: coords.lat,
      lon: coords.lon,
    });
    setModalState('none');
  };

  const confirmRemove = () => {
    if (currentId) removeFavorite(currentId);
    setModalState('none');
  };

  return {
    isFavorite,
    handleToggle,
    modalState,
    closeModal: () => setModalState('none'),
    confirmAdd,
    confirmRemove,
  };
};
