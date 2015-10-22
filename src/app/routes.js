import React from 'react';
import { Route, Redirect } from 'react-router';

import Home from './views/Home';
import Shell from './views/shell';

export default (
  <Route component={Shell}>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Route>
);
