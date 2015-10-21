import compression from 'compression';
import Express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function startServerWith({webpackConfig}) {

  const server = new Express();
  server.use(compression());
  server.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

  if (__DEVELOPMENT__) {
    const compiler = webpack(webpackConfig);

    server.use(webpackDevMiddleware(compiler, {
      lazy: false,
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    }));

    server.use(webpackHotMiddleware(compiler));

    // clear require() cache in development
    // makes asset hot reloading work
    server.use((req, res, next) => {
      webpackIsomorphicToos.refresh();
      next();
    });

    compiler.plugin('done', function() {
      console.log("Clearing module cache from server except for /node_modules/");
      Object.keys(require.cache).forEach(function(id) {
        if (!/\/node_modules\//.test(id)) {
          delete require.cache[id];
        }
      });
    });

  } else {
    server.use(
      webpackConfig.output.publicPath,
      Express.static(webpackConfig.output.path)
    );
  }

  server.use((req, res, next) => {
    require('./client/server-render')(req.path, function(err, htmlString) {
      if (err) return next(err);
      res.send(htmlString);
    });
  });

  const port = 3000;
  server.listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info("☕️  listening on port %s", port);
    }
  });
};
