import React from 'react';
import {Link, IndexLink} from 'react-router';
import './SideMenu.scss';

class SideMenu extends React.Component {
	render () {
		return (
			<aside className="mainSideMenu">
				<ul>
					<li>
						<IndexLink to="/" activeClassName={'active'}>Home</IndexLink>
					</li>
					<li>
						<Link to="/fuel-savings" activeClassName={'active'}>Demo App</Link>
					</li>
					<li>
						<Link to="/about" activeClassName={'active'}>About</Link>
					</li>
				</ul>
			</aside>
		);
	}
}

export default SideMenu;
