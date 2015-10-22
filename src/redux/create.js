import createLogger from 'redux-logger';
import transitionMiddleware from './middlewares/transition';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';

import routes from '../app/routes';

export default function createStore(reduxReactRouter, createHistory, initState) {
  const middlewares = [transitionMiddleware];
  const stores = [
    reduxReactRouter({ routes, createHistory }),
  ];

  if (__DEVELOPMENT__ && __CLIENT__) {
    middlewares.push(createLogger());
    stores.push(devTools());
  }

  stores.push(applyMiddleware(...middlewares))

  const finalCreateStore = compose(...stores)(_createStore);
  const reducer = require('../app/reducers');
  const store = finalCreateStore(reducer, initState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../app/reducers', () => {
      store.replaceReducer(require('../app/reducers'));
    });
  }

  return store;
};
