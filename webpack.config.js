/**
 * Created by tiberiu on 17/06/16.
 */

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devServer: {
		outputPath: __dirname + '/build'
	},
	entry: './src/entry.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.js/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				plugins: ['lodash'],
				presets: ['es2015']
			}
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&minetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			loader: 'file-loader',
		}]
	},
	resolve: {
		extensions: ['', '.js', '.json', 'less']
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './src/index.html'
		}, {
			from: './public',
			to: 'public'
		}])
	]
};
