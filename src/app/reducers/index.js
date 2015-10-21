import * as Actions from '../actions';
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

const initOutput = [
  ' _____     _ _                      _ ',
  '|  |  |___| | |___      ___ _____ _| |',
  '|     | -_| | | . |_   |  _|     | . |',
  '|__|__|___|_|_|___| |  |___|_|_|_|___|',
  '                  |_|                 '
];

function output(state = [], action) {
  const { type, cmd }  = action;

  switch (type) {
    case Actions.RUN_CMD:
      return state.concat([cmd]);

    case Actions.LOAD_INIT_OUTPUT:
      return initOutput;

    default:
      return state;
  }
}

export default combineReducers({
  output,
  router
});
