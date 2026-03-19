import { http, HttpResponse } from 'msw';

import Posts from '../index';
import { render } from '../../../../test-utils/render';
import { server } from '../../../../test-utils/requests';
import { BASE_URL } from '@/config';
import { screen, waitFor } from '@testing-library/react-native';

describe('PostsScreen', () => {
	it('Renders Correctly', () => {
		render(<Posts />);
	});

	it('Shows Error Text', async () => {
		server.use(
			http.get(
				`${BASE_URL}/posts`,
				() =>
					new HttpResponse('Not found', {
						status: 404,
						headers: {
							'Content-Type': 'text/plain',
						},
					}),
			),
		);

		render(<Posts />);

		await waitFor(() => {
			expect(screen.getByText(/Please try again/i)).toBeTruthy();
		});
	});
});
