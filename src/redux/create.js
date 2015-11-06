import createLogger from 'redux-logger';
import transitionMiddleware from './middlewares/transition';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import routes from '../app/routes';

export default function createStore(reduxReactRouter, createHistory, initState) {
  const middlewares = [transitionMiddleware];
  const stores = [
    reduxReactRouter({ routes, createHistory }),
  ];

  if (__DEVELOPMENT__ && __CLIENT__) {
    middlewares.push(createLogger());
  }

  stores.push(applyMiddleware(...middlewares));

  if (__DEVELOPMENT__) {
    if (__CLIENT__) {
      const DevTools = require('../client/DevTools');
      stores.push(DevTools.instrument());
      stores.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
    }
  }

  const finalCreateStore = compose(...stores)(_createStore);
  const reducer = require('../app/reducers');
  const store = finalCreateStore(reducer, initState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../app/reducers', () => {
      store.replaceReducer(require('../app/reducers'));
    });
  }

  return store;
}
