import createHistory from 'history/lib/createMemoryHistory';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'redux-router/server';
import { Provider } from 'react-redux';
import { reduxReactRouter } from 'redux-router/server';
import { ReduxRouter } from 'redux-router';

import createStore from '../redux/create';
import Html from '../app/Html';

const debug = require('debug')('cmd:server:render');

function renderApp(path, done) {
  const store = createStore(reduxReactRouter, createHistory);

  store.dispatch(match(path, (err, redirectLocation, routerState) => {
    if (err) {
      return done(err);
    }

    if (redirectLocation) {
      return done(null, redirectLocation.pathname);
    }

    if (!routerState) {
      debug('404');
      // handle 404
    }

    // Otherwise, render to string
    store.getState().router.then(() => {
      const component = (
        <Provider store={store}>
          <ReduxRouter />
        </Provider>
      );

      const html = (<Html
        assets={webpackIsomorphicTools.assets()}
        component={component}
        store={store}
      />);

      done(null, null, '<!DOCTYPE html>\n' + ReactDOM.renderToString(html));
    });
  }));
}

module.exports = renderApp;
