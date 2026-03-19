import React from 'react';
import { render as testing_render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function getTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: Infinity,
			},
		},
	});
}

export function render(ui: React.ReactElement) {
	const queryClient = getTestQueryClient();

	return testing_render(
		<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
	);
}
