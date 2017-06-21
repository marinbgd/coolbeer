import React from 'react';
import {Link, IndexLink} from 'react-router';
import './SideMenu.scss';

class SideMenu extends React.Component {
	render () {
		return (
			<aside className="mainSideMenu">
				<ul>
					<li>
						<IndexLink to="/">Home</IndexLink>
					</li>
					<li>
						<Link to="/fuel-savings">Demo App</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</aside>
		);
	}
}

export default SideMenu;
