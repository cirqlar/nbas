import { setupServer } from 'msw/node';
import { http, HttpResponse, type HttpHandler } from 'msw';

import { BASE_URL } from '@/config';
import postsJson from './posts.json';
import commentsJson from './comments.json';

const handlers: HttpHandler[] = [];

const posts = http.get(`${BASE_URL}/posts`, () => {
	return HttpResponse.json(postsJson);
});
handlers.push(posts);

for (let i = 0; i < postsJson.length; i++) {
	const post = postsJson[i];

	handlers.push(
		http.get(`${BASE_URL}/posts/${post.id}`, () => {
			return HttpResponse.json(post);
		}),
	);
}

const comments = http.get(`${BASE_URL}/posts/1/comments`, () => {
	return HttpResponse.json(commentsJson);
});
handlers.push(comments);

export const server = setupServer(...handlers);
