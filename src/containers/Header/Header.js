import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Header.scss';

const iconMenuStyle = {
	position: 'relative',
	top: '-16px',
};

class Header extends React.Component {
	render () {
		const buttonStyle = {
			backgroundColor: 'transparent',
			color: 'white'
		};
		const homeLink = <Link to="/" activeClassName={'active'} />;
		const compareLink = <Link to="/compare" activeClassName={'active'} />;
		const compareByShopsLink = <Link to="/compareByShops" activeClassName={'active'} />;
		const aboutLink = <Link to="/about" activeClassName={'active'} />;
		const demoLink = <Link to="/demo" activeClassName={'active'} />;

		const dropdown = (
			<IconMenu
				style={iconMenuStyle}
				iconButtonElement={<IconButton><MoreVertIcon color="#ffffff" /></IconButton>}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
				<MenuItem primaryText="Compare two Shops" linkButton containerElement={compareLink} />
				<MenuItem primaryText="Compare Consumption by Shops" linkButton containerElement={compareByShopsLink} />
			</IconMenu>
		);

		const rightButtons = (
			<nav>
				<FlatButton style={buttonStyle} containerElement={homeLink} label="Home" />
				<FlatButton style={buttonStyle} containerElement={aboutLink} label="About" />
				<FlatButton style={buttonStyle} containerElement={demoLink} label="Demo" />
				{dropdown}
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
