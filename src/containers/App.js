import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header/Header';
import SideMenu from './SideMenu/SideMenu';
import MainWrapper from './MainWrapper/MainWrapper';

import { connect } from 'react-redux';
//import { fuelSavings } from '../reducers/index';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
	render() {
		const { fuelSavings } = this.props;
		return (
		<div className="wrapper table">
			<div className="layout-header">
				<Header store={fuelSavings} />
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
	fuelSavings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		fuelSavings: state.fuelSavings
	};
};




export default connect(mapStateToProps)(App);
