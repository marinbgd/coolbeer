import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import './CircleWidget.scss';

import ReactTooltip from 'react-tooltip';

const style = {
	display: 'inline-block',
	position: 'relative',
	height: 150,
	width: 150,
	margin: 20,
};

const CircleWidget = (props) => (
	<Paper style={{...style, backgroundColor: props.color}} zDepth={3} circle={true}>
		<div className="circle-widget" data-tip={props.tooltip}>
			<span className="circle-widget__title">{props.title}</span>
			<span className="circle-widget__text">{props.text}</span>
		</div>
		<ReactTooltip />
	</Paper>
);

CircleWidget.propTypes = {
	text: PropTypes.string.isRequired,
	title: PropTypes.string,
	tooltip: PropTypes.string,
	color: PropTypes.string,
};

export default CircleWidget;
