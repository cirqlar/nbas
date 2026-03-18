module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		'babel-plugin-react-compiler',
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					'@': './src',
				},
			},
		],
	],
};
