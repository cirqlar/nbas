module.exports = {
	preset: 'react-native',
	setupFiles: ['<rootDir>/test-utils/setup.ts'],
	setupFilesAfterEnv: ['<rootDir>/test-utils/setupEnv.ts'],
	moduleNameMapper: {
		'\\.svg': '<rootDir>/__mocks__/svgMock.js',
		'\\.css': '<rootDir>/__mocks__/styleMock.js',
	},
	transformIgnorePatterns: [
		'node_modules/(?!(@react-native|react-native|@uni-stack|uniwind|@react-navigation|until-async)/)',
	],
	testEnvironmentOptions: {
		customExportConditions: [''],
	},
};
