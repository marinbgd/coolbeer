import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/Home/HomePage';
import FuelSavingsPage from './components/DemoApp/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/About/AboutPage';
import NotFoundPage from './components/NotFound/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
