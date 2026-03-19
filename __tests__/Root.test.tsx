import React from 'react';
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react-native';

import Root from '../Root';
import PostsJson from '../test-utils/requests/posts.json';

jest.mock('@react-navigation/native', () => {
	const actualNavigation = jest.requireActual('@react-navigation/native');
	return {
		...actualNavigation,
	};
});

describe('Application', () => {
	it('renders correctly', async () => {
		render(<Root />);

		await waitFor(() => {
			expect(screen.getByText(PostsJson[0].title)).toBeTruthy();
			expect(screen.getByText(PostsJson[1].title)).toBeTruthy();
		});
	});

	it('Goes to Post correctly', async () => {
		render(<Root />);

		let postLink = screen.getByRole('link', { name: PostsJson[0].title });
		fireEvent.press(postLink);

		await waitFor(() => {
			expect(screen.queryByText(PostsJson[1].title)).toBeNull();
			expect(screen.getByText(/Comments/i)).toBeTruthy();
		});
	});
});
