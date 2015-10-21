import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import promise from '../middlewares/promise';
import rootReducer from '../reducers';
import routes from '../routes';
import transitionMiddleware from '../../redux/middlewares/transition';
import { createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';

const initialState = {};

const composedCreateStore = compose(
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(promise, createLogger(), transitionMiddleware),
  devTools()
)(createStore)

export default composedCreateStore(rootReducer, initialState);
