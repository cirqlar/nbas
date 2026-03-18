const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	transformer: {
		babelTransformerPath:
			require.resolve('react-native-svg-transformer/react-native'),
	},
	resolver: {
		assetExts: assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...sourceExts, 'svg'],
	},
};

const baseConfig = mergeConfig(defaultConfig, config);

module.exports = withUniwindConfig(baseConfig, {
	cssEntryFile: './src/global.css',
	dtsFile: './src/uniwind-types.d.ts',
});
