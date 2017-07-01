import {
	HOMEPAGE_SET_NEW_DATA,
	HOMEPAGE_SET_START_DATE,
	HOMEPAGE_SET_END_DATE,
	FETCH_HOME_DATA_SUCCESS,
} from './HomePage.actions';

import DateHelper from '../../common/DateHelper';

import { cloneDeep } from 'lodash';

const initialState = {
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
	},

	datePicker: {
		startDate: DateHelper.getStartOfDay( new Date() ),
		endDate: DateHelper.getNextMonth( DateHelper.getEndOfDay( new Date() ) ),
	},

	homeData: [],

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
	newState.barChartData.data.datasets[0].data = getRandomData();
	newState.pieChartData.data.datasets[0].data = getRandomData();
	return newState;
};

const setStartDate = (state, date) => {
	let newState = cloneDeep(state);
	newState.datePicker.startDate = DateHelper.getStartOfDay(date);
	return newState;
};

const setEndDate = (state, date) => {
	let newState = cloneDeep(state);
	newState.datePicker.endDate = DateHelper.getEndOfDay(date);
	return newState;
};

const setHomeData = (state, data) => {
	let newState = cloneDeep(state);
	newState.homeData = data;
	return newState;
};

export default function homePage (state = initialState, action) {
	switch (action.type) {
		case HOMEPAGE_SET_NEW_DATA:
			return randomDataChange(state);
		case HOMEPAGE_SET_START_DATE:
			return setStartDate(state, action.payload);
		case HOMEPAGE_SET_END_DATE:
			return setEndDate(state, action.payload);
		case FETCH_HOME_DATA_SUCCESS:
			return setHomeData(state, action.payload);
		default:
			return state;
	}
}
