import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import * as Actions from '../actions';

function output(state = [], action) {
  const { type, cmd }  = action;

  switch (type) {
    case Actions.RUN_CMD:
      return state.concat([cmd]);

    case Actions.PRINT:
      const { data } = action;
      return state.concat(data.split('\n'));

    default:
      return state;
  }
}

export default combineReducers({
  output,
  router
});
