import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header/Header';
import SideMenu from './SideMenu/SideMenu';
import MainWrapper from './MainWrapper/MainWrapper';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
	render() {
		return (
			<main>
				<Header />
				<SideMenu />
				<MainWrapper>{this.props.children}</MainWrapper>
			</main>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;
