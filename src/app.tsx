import { useEffect } from 'react';
import { onlineManager, QueryClientProvider } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

import { Navigation } from '@/routes';
import queryClient from '@/queries';

export default function App() {
	useEffect(() => {
		onlineManager.setEventListener(setOnline => {
			return NetInfo.addEventListener(state => {
				setOnline(!!state.isConnected);
			});
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Navigation />
		</QueryClientProvider>
	);
}
