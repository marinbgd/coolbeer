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
