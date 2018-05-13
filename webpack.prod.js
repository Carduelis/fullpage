const merge = require('webpack-merge');
const { NamedModulesPlugin, DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new NamedModulesPlugin(),
		new UglifyJSPlugin(),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
});
