const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

	entry: {
		app: './src/index.js',
		polyfills: './src/polyfills.js'
	},
	module: {
		rules: [{
		 test: /\.js$/,
		 include: path.resolve(__dirname, "src"),
		 loader: "babel-loader"
	 }]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Common name for both webpack configs',
			template: 'src/index.html'
		}),
		// new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // Specify the common bundle's name.
    //  })
	],
	output: {
		filename: '[name].bundle.js',
		// chunkFilename: '[name].chunk.bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
