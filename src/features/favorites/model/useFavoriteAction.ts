import { useFavoritesStore } from './useFavoritesStore';

const MAX_FAVORITES = 6;

export const useFavoriteAction = (
  locationName: string | undefined,
  coords: GeoLocation | null
) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const currentId = coords
    ? `${coords.lat.toFixed(4)}-${coords.lon.toFixed(4)}`
    : null;

  const isFavorite = currentId
    ? favorites.some((fav) => fav.id === currentId)
    : false;

  const toggleFavorite = () => {
    if (!coords || !currentId || !locationName) return;

    if (isFavorite) {
      if (window.confirm('즐겨찾기에서 삭제하시겠습니까?')) {
        removeFavorite(currentId);
      }
    } else {
      if (favorites.length >= MAX_FAVORITES) {
        alert(`즐겨찾기는 최대 ${MAX_FAVORITES}개까지만 저장할 수 있습니다!`);
        return;
      }

      const aliasInput = window.prompt(
        '즐겨찾기 별칭을 입력해주세요.',
        locationName
      );
      if (aliasInput === null) return;

      const finalAlias = aliasInput.trim() || locationName;

      addFavorite({
        id: currentId,
        name: locationName,
        alias: finalAlias,
        lat: coords.lat,
        lon: coords.lon,
      });
    }
  };

  return { isFavorite, toggleFavorite };
};
