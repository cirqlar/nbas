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

export function Wrapper({ children }: { children: React.ReactNode }) {
	const queryClient = getTestQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

export function render(ui: React.ReactElement) {
	return testing_render(<Wrapper>{ui}</Wrapper>);
}
