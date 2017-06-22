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
			<main>
				<Header store={fuelSavings} />
				<SideMenu />
				<MainWrapper>{this.props.children}</MainWrapper>
			</main>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
};

const mapStateToProps = (state) => {
	return {
		fuelSavings: state.fuelSavings
	};
};




export default connect(mapStateToProps)(App);
