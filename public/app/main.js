import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router';
import App from './components/app';
import Slide from './components/slide';

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
      <Route path='/slides/:number' component={Slide} />
    </Route>
  </Router>
), document.getElementById('app'));
