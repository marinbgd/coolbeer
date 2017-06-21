import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';

import './Header.scss';

class Header extends React.Component {
	render () {
		return (
			<header className="mainHeader">
				<nav>
					<IndexLink to="/">Home</IndexLink>
					{' | '}
					<Link to="/fuel-savings">Demo App</Link>
					{' | '}
					<Link to="/about">About</Link>
					<br/>
					{this.props.children}
				</nav>
			</header>
		);
	}
}

Header.propTypes = {
	children: PropTypes.element
};

export default Header;
