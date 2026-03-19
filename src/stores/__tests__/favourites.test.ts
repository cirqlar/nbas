import {
	useFavouritesStore,
	addFavourite,
	removeFavourite,
} from '../favourites';

describe('useFavouritesStore', () => {
	beforeEach(() => {
		useFavouritesStore.setState({ favourites: [] });
	});

	it('Adds items to favourites', () => {
		addFavourite(1);
		addFavourite(2);
		addFavourite(3);

		const state = useFavouritesStore.getState();

		expect(state.favourites).toHaveLength(3);
		expect(state.favourites).toContain(1);
		expect(state.favourites).toContain(2);
		expect(state.favourites).toContain(3);
	});

	it('Does not add duplicates', () => {
		addFavourite(1);
		addFavourite(1);

		const state = useFavouritesStore.getState();

		expect(state.favourites).toHaveLength(1);
	});

	it('Removes items from favourites', () => {
		addFavourite(1);
		addFavourite(2);
		addFavourite(3);

		removeFavourite(2);

		const state = useFavouritesStore.getState();

		expect(state.favourites).toHaveLength(2);
		expect(state.favourites).toContain(1);
		expect(state.favourites).not.toContain(2);
		expect(state.favourites).toContain(3);
	});

	it("Doesn't fail when item doesn't exist", () => {
		expect(() => removeFavourite(2)).not.toThrow();
	});
});
