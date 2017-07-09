import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import './Header.scss';


class Header extends React.Component {
	render () {
		const buttonStyle = {
			backgroundColor: 'transparent',
			color: 'white'
		};
		const homeLink = <Link to="/" activeClassName={'active'} />;
		const aboutLink = <Link to="/about" activeClassName={'active'} />;
		const demoLink = <Link to="/demo" activeClassName={'active'} />;
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
					title="CoolBeer"
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
};

export default Header;
