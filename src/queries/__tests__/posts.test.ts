import { renderHook, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { usePostQuery, usePostsQuery } from '../posts';
import { Wrapper } from '../../../test-utils/render';
import { server } from '../../../test-utils/requests';
import { BASE_URL } from '@/config';

describe('usePostsQuery', () => {
	it('Gets posts', async () => {
		let { result: usePostsQueryReturn } = renderHook(
			() => usePostsQuery(),
			{ wrapper: Wrapper },
		);

		await waitFor(() => {
			expect(usePostsQueryReturn.current.data).not.toBeUndefined();
			expect(usePostsQueryReturn.current.data).toHaveLength(5);
		});
	});

	it('throws status 400 errors', async () => {
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

		let { result: usePostsQueryReturn } = renderHook(
			() => usePostsQuery(),
			{ wrapper: Wrapper },
		);

		await waitFor(() => {
			expect(usePostsQueryReturn.current.data).toBeUndefined();
			expect(usePostsQueryReturn.current.isError).toBe(true);
		});
	});
});

describe('usePostQuery', () => {
	it('Gets post', async () => {
		let { result: usePostQueryReturn } = renderHook(() => usePostQuery(1), {
			wrapper: Wrapper,
		});

		await waitFor(() => {
			expect(usePostQueryReturn.current.data).not.toBeUndefined();
			expect(usePostQueryReturn.current.data?.id).toBe(1);
		});
	});

	it('throws status 400 errors', async () => {
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

		let { result: usePostQueryReturn } = renderHook(() => usePostQuery(1), {
			wrapper: Wrapper,
		});

		await waitFor(() => {
			expect(usePostQueryReturn.current.data).toBeUndefined();
			expect(usePostQueryReturn.current.isError).toBe(true);
		});
	});
});
