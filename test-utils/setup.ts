jest.mock('@react-native-async-storage/async-storage', () =>
	require('./async-storage'),
);

jest.mock('@react-native-community/netinfo', () =>
	require('@react-native-community/netinfo/jest/netinfo-mock.js'),
);

jest.mock('@react-navigation/native', () => {
	const actualNavigation = jest.requireActual('@react-navigation/native');
	return {
		...actualNavigation,
		useNavigation: () => ({}),
	};
});
