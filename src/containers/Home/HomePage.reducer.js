import {
	HOMEPAGE_SET_NEW_DATA,
} from './HomePage.actions';

import { cloneDeep } from 'lodash';

const initialState = {
	polarAreaData: {
		datasets: [{
			data: [11, 16, 7, 3, 14],
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
	},
	barChartData: {
		type: 'bar',
		data: {
			labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
			datasets: [{
				label: 'Title',
				data: [12, 19, 3, 5, 2],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	},
	pieChartData: {
		type: 'pie',
		data: {
			labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
			datasets: [{
				data: [12, 19, 3, 5, 2],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1
			}]
		}
	}
};

const getRandomData = () => {
	let data = [];
	for (let i = 0, len = 5; i < len; i++) {
		data.push(parseInt(Math.random() * 50));
	}
	return data;
};

const randomDataChange = (state) => {
	let newState = cloneDeep(state);
	newState.polarAreaData.datasets[0].data = getRandomData();
	newState.barChartData.data.datasets[0].data = getRandomData();
	newState.pieChartData.data.datasets[0].data = getRandomData();
	return newState;
};

export default function homePage (state = initialState, action) {
	switch (action.type) {
		case HOMEPAGE_SET_NEW_DATA:
			return randomDataChange(state);
		default:
			return state;
	}
}
