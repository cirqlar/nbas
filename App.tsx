import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

import App from '@/app';

function Root() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaListener
			onChange={({ insets }) => {
				Uniwind.updateInsets(insets);
			}}
		>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<App />
		</SafeAreaListener>
	);
}

export default Root;
