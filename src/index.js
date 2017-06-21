/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import Root from './components/Root';

import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


try {
	injectTapEventPlugin();
} catch(error) {
	console.log(error);
}

render(
	<AppContainer>
		<MuiThemeProvider>
			<Root store={store} history={history}/>
		</MuiThemeProvider>
	</AppContainer>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept('./components/Root', () => {
		const NewRoot = require('./components/Root').default;
		render(
			<AppContainer>
				<NewRoot store={store} history={history}/>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
