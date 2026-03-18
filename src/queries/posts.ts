import { useQuery, useQueryClient } from '@tanstack/react-query';
import { array, InferOutput, number, object, parse, string } from 'valibot';

import { BASE_URL } from '@/config/';
import { throwFailedResponse } from '@/util/query';

let PostSchema = object({
	userId: number(),
	id: number(),
	title: string(),
	body: string(),
});

let PostsSchema = array(PostSchema);

export type TPost = InferOutput<typeof PostSchema>;
export type TPosts = InferOutput<typeof PostsSchema>;

export function usePostsQuery() {
	return useQuery({
		queryKey: ['posts'],
		queryFn: () =>
			fetch(`${BASE_URL}/posts`)
				.then(throwFailedResponse)
				.then(async res => parse(PostsSchema, await res.json())),
	});
}

export function usePostQuery(id: number) {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ['posts', id],
		queryFn: () =>
			fetch(`${BASE_URL}/posts/${id}`)
				.then(throwFailedResponse)
				.then(async res => parse(PostSchema, await res.json())),
		initialData: () =>
			queryClient
				.getQueryData<TPosts>(['posts'])
				?.find(post => post.id === id),
		initialDataUpdatedAt: () =>
			queryClient.getQueryState(['posts'])?.dataUpdatedAt,
	});
}
