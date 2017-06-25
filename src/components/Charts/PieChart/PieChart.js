import React from 'react';
import RC2 from 'react-chartjs2';
import PropTypes from 'prop-types';

const PieChart = props => {
	return <RC2 data={props.data} type="pie" />;
};

PieChart.propTypes = {
	data: PropTypes.object.isRequired
};

export default PieChart;
