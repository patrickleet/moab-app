import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import HomePage from './HomePage';

export default (
  <Route path="/" component={Layout} >
    <IndexRoute component={HomePage}/>
  </Route>
);