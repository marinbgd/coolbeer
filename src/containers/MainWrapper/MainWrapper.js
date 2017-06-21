import React from 'react';
import PropTypes from 'prop-types';

import './MainWrapper.scss';

class MainWrapper extends React.Component {
	render () {
		return (
			<div className="mainWrapper">
				{this.props.children}
			</div>
		);
	}
}

MainWrapper.propTypes = {
	children: PropTypes.element
};

export default MainWrapper;
