import React from 'react';
import { Route, Redirect } from 'react-router';

import Home from './modules/Home';
import Shell from './components/shell';

export default (
  <Route component={Shell}>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Route>
);
