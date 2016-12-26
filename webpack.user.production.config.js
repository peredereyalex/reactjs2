var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var settings = {
	plugins: [
	    new ExtractTextPlugin('./assets/css/styles.css', {
	        allChunks: true
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	    	minimize: true,
	    	warnings: false,
	    	mangle: {
	        	except: ['$super', '$', 'exports', 'require']
		    }
		}),
	    new webpack.optimize.DedupePlugin(),
	    new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	module: ["es2015", "react"]
}

module.exports = {
    entry: {
        bundle: "./src/react_user/App.jsx"
    },
    output: {
        filename: "./assets/js/bundle_user.js"
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'file-loader?importLoaders=1&limit=100000&name=../i/[folder]/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader?importLoaders=1&limit=100000&name=../fonts/[name].[ext]'
            },
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                   presets: settings.module
                }
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!autoprefixer!sass-loader')
            }
        ]
    },
    plugins: settings.plugins,
    sassLoader: {
        includePaths: ['src/scss']
    },
    devServer: {
        historyApiFallback: true
    }
};
