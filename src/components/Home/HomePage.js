import React from 'react';
import {Link} from 'react-router';

import Paper from 'material-ui/Paper';

import PieChart from '../Charts/PieChart/PieChart';
import DoughnutChart from '../Charts/DoughnutChart/DoughnutChart';
import BarChart from '../Charts/BarChart/BarChart';
import PolarAreaChart from '../Charts/PolarAreaChart/PolarAreaChart';
import RealTimePolarArea from '../Charts/RealTimePolarArea/RealTimePolarArea';


//mock chart data
const chartData = {
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
};

const barChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Bar chart',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40],
		}
	]
};

const polarChartData = {
	datasets: [{
		data: [
			11,
			16,
			7,
			3,
			14
		],
		backgroundColor: [
			'#FF6384',
			'#4BC0C0',
			'#FFCE56',
			'#E7E9ED',
			'#36A2EB'
		],
		label: 'My dataset' // for legend
	}],
	labels: [
		'Red',
		'Green',
		'Yellow',
		'Grey',
		'Blue'
	]
};

const paperStyle = {
	height: '100%',
	width: '100%',
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
};

const HomePage = () => {
	return (
		<section className="relative">
			<h1>React Slingshot</h1>

			<h2>Get Started</h2>
			<ol>
				<li>Review the <Link to="fuel-savings">demo app</Link></li>
				<li>Remove the demo and start coding: npm run remove-demo</li>
			</ol>

			<div className="pure-g">
				<div className="pure-u-1-1 p-">
					<Paper style={paperStyle} zDepth={2}>
						<RealTimePolarArea data={chartData} />
					</Paper>
				</div>
			</div>

			<div className="pure-g">
				<div className="pure-u-1-2 p-">
					<Paper style={paperStyle} zDepth={2}>
						<PieChart data={chartData} />
					</Paper>
				</div>
				<div className="pure-u-1-2 p-">
					<Paper style={paperStyle} zDepth={2}>
						<DoughnutChart data={chartData} />
					</Paper>
				</div>
			</div>

			<div className="pure-g">
				<div className="pure-u-1-2 p-">
					<Paper style={paperStyle} zDepth={2}>
						<BarChart data={barChartData} />
					</Paper>
				</div>
				<div className="pure-u-1-2 p-">
					<Paper style={paperStyle} zDepth={2}>
						<PolarAreaChart data={polarChartData} />
					</Paper>
				</div>
			</div>

		</section>
	);
};

export default HomePage;
