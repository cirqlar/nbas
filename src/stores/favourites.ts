import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavouritesStoreState = {
	favourites: number[];
};

export const useFavouritesStore = create<FavouritesStoreState>()(
	persist(
		_set => ({
			favourites: [],
		}),
		{
			name: 'favourites-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export function removeFavourite(postId: number) {
	useFavouritesStore.setState(state => ({
		favourites: state.favourites.filter(id => id !== postId),
	}));
}

export function addFavourite(postId: number) {
	useFavouritesStore.setState(state => {
		if (useFavouritesStore.getState().favourites.includes(postId)) {
			return state;
		} else {
			return {
				favourites: [...state.favourites, postId],
			};
		}
	});
}
