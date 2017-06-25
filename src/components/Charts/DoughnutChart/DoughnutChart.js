import React from 'react';
import RC2 from 'react-chartjs2';
import PropTypes from 'prop-types';

/*const chartData = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		],
		hoverBackgroundColor: [
			'#Ff1384',
			'#3662EB',
			'#FF9E56'
		]
	}]
};*/

const DoughnutChart = props => {
	return <RC2 data={props.data} type="doughnut" />;
};

DoughnutChart.propTypes = {
	data: PropTypes.object.isRequired
};

export default DoughnutChart;
