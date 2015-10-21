var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

var isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools-config')).development();

var babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.babelrc')));
var babelLoaderQuery = Object.assign({}, babelrc, babelrc.env.development);
delete babelLoaderQuery.env

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform');
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {};
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {};
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = [];
}
babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './src/client',
    './src/app/styles/main.scss'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)], exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
      { test: isomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: false,
      __DEVELOPMENT__: true,
      __SERVER__: false,
      __CLIENT__: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    isomorphicToolsPlugin
  ],
  devtool: 'inline-source-map'
};
