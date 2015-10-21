import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';

const locationsAreEqual = (a, b) => {
  if (a.pathname !== b.pathname) return false;
  if (a.search !== b.search) return false;
  return true;
};

const loadComponentsData = (components, getState, dispatch, location, params) => {
  const getFetchData = (component) => {
    return component.WrappedComponent ? getFetchData(component.WrappedComponent) : component.fetchData;
  };

  return Promise.all(
    components
      .map((component) => getFetchData(component))
      .filter((fetchData) => typeof fetchData === 'function')
      .map((fetchData) => fetchData(getState, dispatch, location, params))
  );
};

export default ({getState, dispatch}) => next => action => {
  if (action.type !== ROUTER_DID_CHANGE)
    return next(action);

  if (getState().router && locationsAreEqual(action.payload.location, getState().router.location))
    return next(action);

  const {components, location, params} = action.payload;
  const promise = new Promise((resolve) => {
    const doTransition = () => {
      next(action);
      resolve();
    };

    loadComponentsData(components, getState, dispatch, location, params).then(doTransition, doTransition);
  });

  if (__SERVER__) {
    getState().router = promise;
  }

  return promise;
};
