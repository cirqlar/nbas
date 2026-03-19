import { QueryClient } from '@tanstack/react-query';

let queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
		},
	},
});

if (process?.env?.JEST_WORKER_ID !== undefined) {
	queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false, gcTime: Infinity } },
	});
}

export default queryClient;
