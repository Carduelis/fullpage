const path = require('path');
const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
		mode: 'development',
    entry: {
      app: './src/index.js'
    },
    devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
		 hot: true
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
				filename: 'index.html',
				template: 'src/index.html'
      }),
			new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
