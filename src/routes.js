import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App';
import HomePage from './containers/Home/HomePage';
import DemoPage from './components/Demo/Demo'; // eslint-disable-line import/no-named-as-default
import ComparePage from './containers/ComparePage/ComparePage';

import AboutPage from './components/About/AboutPage';
import NotFoundPage from './components/NotFound/NotFoundPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="compare" component={ComparePage}/>
		<Route path="demo" component={DemoPage}/>
		<Route path="about" component={AboutPage}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);
