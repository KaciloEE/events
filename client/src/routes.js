import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/Home/index';
import ListBids from './pages/ListBids/index';
import NotFound from './pages/NotFound/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/listBids" component={ListBids} />        
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;