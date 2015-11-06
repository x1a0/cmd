#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var babelrc = fs.readFileSync(path.resolve(__dirname, '..', '.babelrc'));

var config = {};

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('Failed to parsing .babelrc:')
  console.error(err)
}

require('babel/register')(config);

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// server-side global constants
global.__PRODUCTION__ = process.env.NODE_ENV === 'production';
global.__DEVELOPMENT__ = !__PRODUCTION__;
global.__SERVER__ = true;
global.__CLIENT__ = false;

var webpackConfig = __PRODUCTION__ ? require('../webpack/prod.config') : require('../webpack/dev.config');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools-config'))
  .development(__DEVELOPMENT__)
  .server(webpackConfig.context, function() {
    require('../src/server')({
      webpackConfig: webpackConfig
    });
  });
