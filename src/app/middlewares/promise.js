export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;
    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;

    next({
      type: REQUEST,
      ...rest
    });

    return promise
      .then(data => {
        next({data, type: SUCCESS, ...rest});
        return true;
      })
      .catch(err => {
        console.log(err);
        next({err, type: FAILURE, ...rest});
        return false;
      });
  };
};
