import 'whatwg-fetch';

import React from 'react';

import { Router, Route } from 'react-router';
import App from './components/app';

React.render((
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>
), document.getElementById('app'));
