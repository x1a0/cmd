var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var Clean = require('clean-webpack-plugin');

var isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools-config'));
var relativeOutputPath = path.join('..', 'dist');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './src/client',
      './src/app/styles/main.scss'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, relativeOutputPath),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: isomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  plugins: [
    new Clean([relativeOutputPath]),
    new webpack.DefinePlugin({
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
      __SERVER__: false,
      __CLIENT__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

    // optimizations
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),

    isomorphicToolsPlugin
  ],
  devtool: 'source-map'
};

