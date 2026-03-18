const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const base_config = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = withUniwindConfig(base_config, {
	cssEntryFile: './src/global.css',
	dtsFile: './src/uniwind-types.d.ts',
});
