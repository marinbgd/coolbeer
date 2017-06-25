import React from 'react';
import {Link} from 'react-router';

import PieChart from '../Charts/PieChart/PieChart';
import DoughnutChart from '../Charts/DoughnutChart/DoughnutChart';


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

const HomePage = () => {
	return (
		<div>
			<h1>React Slingshot</h1>

			<h2>Get Started</h2>
			<ol>
				<li>Review the <Link to="fuel-savings">demo app</Link></li>
				<li>Remove the demo and start coding: npm run remove-demo</li>
			</ol>


			<div className="pure-g">
				<div className="pure-u-1-2">
					<PieChart data={chartData} />
				</div>
				<div className="pure-u-1-2">
					<DoughnutChart data={chartData} />
				</div>
			</div>

		</div>
	);
};

export default HomePage;
