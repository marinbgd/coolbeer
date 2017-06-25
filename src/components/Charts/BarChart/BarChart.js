import React from 'react';
import RC2 from 'react-chartjs2';
import PropTypes from 'prop-types';

const BarChart = props => {
	return <RC2 data={props.data} type="bar" />;
};

BarChart.propTypes = {
	data: PropTypes.object.isRequired
};

export default BarChart;
