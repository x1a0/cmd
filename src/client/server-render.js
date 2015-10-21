import createHistory from 'history/lib/createMemoryHistory';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'redux-router/server';
import { Provider } from 'react-redux';
import { reduxReactRouter } from 'redux-router/server';
import { ReduxRouter } from 'redux-router';

import createStore from '../redux/create';
var Html = require('../app/html');

function renderApp(path, done) {
  const store = createStore(reduxReactRouter, createHistory);

  store.dispatch(match(path, (err, redirectLocation, routerState) => {
    if (err) {
      done(err);
    }

    if (redirectLocation) {
      // handle redirect
    }

    if (!routerState) {
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
        assets={webpackIsomorphicToos.assets()}
        component={component}
        store={store}
      />);

      done(null, '<!DOCTYPE html>\n' + ReactDOM.renderToString(html));
    });
  }));
};

module.exports = renderApp;
