import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FavoritesState {
  favorites: FavoriteLocation[];
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (location: FavoriteLocation) => void;
  updateAlias: (id: string, newAlias: string) => void;
}

export const useFavoritesStore = create(
  persist(
    immer<FavoritesState>((set, get) => ({
      favorites: [],

      addFavorite: (location) =>
        set((state: FavoritesState) => {
          const exists = state.favorites.some(
            (item) => item.id === location.id
          );
          if (!exists) {
            state.favorites.push(location);
          }
        }),

      removeFavorite: (id) =>
        set((state: FavoritesState) => {
          const index = state.favorites.findIndex((item) => item.id === id);
          if (index !== -1) {
            state.favorites.splice(index, 1);
          }
        }),

      toggleFavorite: (location) => {
        const { favorites, addFavorite, removeFavorite } = get();
        const exists = favorites.some((fav) => fav.id === location.id);
        if (exists) removeFavorite(location.id);
        else addFavorite(location);
      },

      updateAlias: (id, newAlias) =>
        set((state: FavoritesState) => {
          const target = state.favorites.find((item) => item.id === id);
          if (target) {
            target.alias = newAlias;
          }
        }),
    })),
    { name: 'weather-favorites' }
  )
);
