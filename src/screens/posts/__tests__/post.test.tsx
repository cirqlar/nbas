import { http, HttpResponse } from 'msw';

import PostScreen from '../post';
import { render } from '../../../../test-utils/render';
import { server } from '../../../../test-utils/requests';
import { BASE_URL } from '@/config';
import { screen, waitFor } from '@testing-library/react-native';
import PostsJson from '../../../../test-utils/requests/posts.json';

describe('PostScreen', () => {
	it('Renders Correctly', () => {
		render(<PostScreen route={{ params: { postId: 1 } }} />);
	});

	it('Shows Error Text', async () => {
		server.use(
			http.get(
				`${BASE_URL}/posts/1`,
				() =>
					new HttpResponse('Not found', {
						status: 404,
						headers: {
							'Content-Type': 'text/plain',
						},
					}),
			),
		);

		render(<PostScreen route={{ params: { postId: 1 } }} />);

		await waitFor(() => {
			expect(screen.getByText(/Please try again/i)).toBeTruthy();
		});
	});

	it('Shows posts when comments fail', async () => {
		server.use(
			http.get(
				`${BASE_URL}/posts/1/comments`,
				() =>
					new HttpResponse('Not found', {
						status: 404,
						headers: {
							'Content-Type': 'text/plain',
						},
					}),
			),
		);

		render(<PostScreen route={{ params: { postId: 1 } }} />);

		await waitFor(() => {
			expect(screen.getByText(PostsJson[0].title)).toBeTruthy();
			expect(screen.getAllByText(/Comments/i)).toBeTruthy();
			expect(screen.getByText(/Please try again/i)).toBeTruthy();
		});
	});

	it("Doesn't show comments when post fails", async () => {
		server.use(
			http.get(
				`${BASE_URL}/posts/1`,
				() =>
					new HttpResponse('Not found', {
						status: 404,
						headers: {
							'Content-Type': 'text/plain',
						},
					}),
			),
		);

		render(<PostScreen route={{ params: { postId: 1 } }} />);

		await waitFor(() => {
			expect(screen.queryAllByText(/Comment/i)).toHaveLength(0);
		});
	});
});
