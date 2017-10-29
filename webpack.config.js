var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
    	{
	      exclude: /node_modules/,
	      use: 'babel-loader'
	  	},
      	{
        	test: /\.html$/,
        	use: 'html-loader'
     	},
	    {
	    	test:/\.(jpe?g|png|gif|svg)$/,
	    	use: ['file-loader?name=[name].[ext]&outputPath=assets/images/','image-webpack-loader']
	    },
	    {
        	test: /\.css$/,
        	use: ExtractTextPlugin.extract({
          		fallback: "style-loader",
          		use: "css-loader"
        	})
      	}
	]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("style.css")
  ]
};


