import createHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';

import createStore from '../redux/create';
import routes from '../app/routes';

const store = createStore(reduxReactRouter, createHistory, window.__data);

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>,
  document.getElementById('root')
);

if (__DEVELOPMENT__) {
  const Debug = require('./Debug');
  ReactDOM.render(
    <Debug store={store}/>,
    document.getElementById('debug')
  );
}
