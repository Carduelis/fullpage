const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
});
