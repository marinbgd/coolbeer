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
		<div className="wrapper table">
			<div className="layout-header">
				<Header />
			</div>
			<div className="layout-main">
				<div className="layout-box layout-sidebar">
					<SideMenu />
				</div>
				<div className="layout-box layout-content">
					<MainWrapper>{this.props.children}</MainWrapper>
				</div>
			</div>
			<div className="layout-footer">
				<p className="footer-text">© Cool Beer {new Date().getFullYear()} -  All rights reserved.</p>
			</div>
		</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
};

export default App;
