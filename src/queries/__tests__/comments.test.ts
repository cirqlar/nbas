import { renderHook, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { useCommentsQuery } from '../comments';
import { Wrapper } from '../../../test-utils/render';
import { server } from '../../../test-utils/requests';
import { BASE_URL } from '@/config';

describe('useCommentsQuery', () => {
	it('Gets comments', async () => {
		let { result: useCommentsQueryReturn } = renderHook(
			() => useCommentsQuery(1),
			{ wrapper: Wrapper },
		);

		await waitFor(() => {
			expect(useCommentsQueryReturn.current.data).not.toBeUndefined();
			expect(useCommentsQueryReturn.current.data).toHaveLength(5);
		});
	});

	it('throws status 400 errors', async () => {
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

		let { result: useCommentsQueryReturn } = renderHook(
			() => useCommentsQuery(1),
			{ wrapper: Wrapper },
		);

		await waitFor(() => {
			expect(useCommentsQueryReturn.current.data).toBeUndefined();
			expect(useCommentsQueryReturn.current.isError).toBe(true);
		});
	});
});
