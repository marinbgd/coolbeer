import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import './Header.scss';


class Header extends React.Component {
	render () {
		const {store} = this.props;
		const buttonStyle = {
			backgroundColor: 'transparent',
			color: 'white'
		};
		const homeLink = <Link to="/" activeClassName={'active'} />;
		const aboutLink = <Link to="/about" activeClassName={'active'} />;
		const demoLink = <Link to="/fuel-savings" activeClassName={'active'} />;
		const rightButtons = (
			<nav>
				<FlatButton style={buttonStyle} containerElement={homeLink} label="Home" />
				<FlatButton style={buttonStyle} containerElement={aboutLink} label="About" />
				<FlatButton style={buttonStyle} containerElement={demoLink} label="Demo" />
			</nav>
		);

		return (
			<header className="mainHeader">
				<AppBar
					title="Cool Beer"
					showMenuIconButton={false}
					iconElementRight={rightButtons}
				/>

				{this.props.children}

			</header>
		);
	}
}

Header.propTypes = {
	children: PropTypes.element,
	store: PropTypes.object.isRequired,
};

export default Header;
