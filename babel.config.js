module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@components': './src/components',
						'@constants': './src/constants',
						'@screens': './src/screens',
						'@util': './src/util',
						'@services': './src/services',
					},
				},
			],
		],
	};
};
