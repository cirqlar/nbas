import { queryOptions, useQuery } from '@tanstack/react-query';
import {
	array,
	email as vemail,
	InferOutput,
	number,
	object,
	parse,
	string,
	pipe,
} from 'valibot';

import { BASE_URL } from '@/queries/';
import { throwFailedResponse } from '@/util/query';

let CommentSchema = object({
	postId: number(),
	id: number(),
	name: string(),
	email: pipe(string(), vemail()),
	body: string(),
});

let CommentsSchema = array(CommentSchema);

export type TComment = InferOutput<typeof CommentSchema>;
export type TComments = InferOutput<typeof CommentsSchema>;

export function commentQueryOptions(postId: number) {
	return queryOptions({
		queryKey: ['comments', postId],
		queryFn: () =>
			fetch(`${BASE_URL}/posts/${postId}/comments`)
				.then(throwFailedResponse)
				.then(async res => parse(CommentsSchema, await res.json())),
	});
}

export function useCommentsQuery(postId: number) {
	return useQuery(commentQueryOptions(postId));
}
