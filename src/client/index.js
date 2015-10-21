import createHistory from 'history/lib/createBrowserHistory';
import createStore from '../redux/create';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../app/routes';
import { Provider } from 'react-redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';

const store = createStore(reduxReactRouter, createHistory, window.__data);

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  require('./createDevToolsWindow')(store);
}
