import React from 'react';
import RC2 from 'react-chartjs2';
import PropTypes from 'prop-types';

const PolarAreaChart = props => {
	return <RC2 data={props.data} type="polarArea" />;
};

PolarAreaChart.propTypes = {
	data: PropTypes.object.isRequired
};

export default PolarAreaChart;
