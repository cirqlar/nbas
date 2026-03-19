jest.mock('@react-native-async-storage/async-storage', () =>
	require('./async-storage'),
);

jest.mock('@react-native-community/netinfo', () =>
	require('@react-native-community/netinfo/jest/netinfo-mock.js'),
);
