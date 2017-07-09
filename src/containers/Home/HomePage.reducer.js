import {
	HOMEPAGE_SET_NEW_DATA,
	HOMEPAGE_SET_START_DATE,
	HOMEPAGE_SET_END_DATE,

	REQUEST_SHOPS,
	RECEIVE_SHOPS,
	RECEIVE_SHOPS_ERROR,
	SET_SELECTED_SHOPS,

	REQUEST_SHOPS_DETAILS,
	RECEIVE_SHOPS_DETAILS,
	RECEIVE_SHOPS_DETAILS_ERROR,

	SET_SEARCH_VALUE,
} from './HomePage.actions';

import DateHelper from '../../common/DateHelper';

import { cloneDeep } from 'lodash';

const date6MonthBeforeNow = new Date().setMonth(new Date().getMonth() - 6);

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
		startDate: DateHelper.getStartOfDay( date6MonthBeforeNow ),
		endDate: DateHelper.getNextMonth( DateHelper.getEndOfDay( new Date() ) ),
	},

	shops: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},

	shopsDetails: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},

	search: {
		term: '',
	},
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

const setShopsFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.shops.isFetching = isFetching;
	return newState;
};
const setShops = (state, action) => {
	let newState = cloneDeep(state);
	newState.shops.items = action.payload || [];
	newState.shops.lastUpdated = action.receivedAt;
	newState.shops.isFetching = false;
	return newState;
};
const setShopsError = (state, action) => {
	let newState = cloneDeep(state);
	newState.shops.items = [];
	newState.shops.lastUpdated = action.receivedAt;
	newState.shops.isFetching = false;
	return newState;
};
const bgLatLng = {
	lat: 44.796417,
	lng: 20.378024,
};
const _makeRandomLatLng = (coor) => {
	let coorString = coor.toString();
	//get first 3 digits
	coorString = coorString.substr(0, 4);
	//randomize next 5 digits
	let random = Math.random().toString().substr(2, 5);
	//concatenate and return number
	return + coorString+random;
};
const setSelectedShops = (state, selectedShopIds) => {
	let newState = cloneDeep(state);
	newState.shops.items.forEach( shop => {
		shop._selected = !!(~selectedShopIds.indexOf(shop.sn));
		//fake marker positions
		shop.mapMarker = {
			name: shop.sn,
			lat: _makeRandomLatLng(bgLatLng.lat),
			lng: _makeRandomLatLng(bgLatLng.lng),
		};
	});
	return newState;
};

const setShopsDetailsFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.shopsDetails.isFetching = isFetching;
	return newState;
};
const setShopsDetails = (state, action) => {
	let newState = cloneDeep(state);
	newState.shopsDetails.items = action.payload || [];
	newState.shopsDetails.lastUpdated = action.receivedAt;
	newState.shopsDetails.isFetching = false;
	return newState;
};
const setShopsDetailsError = (state, action) => {
	let newState = cloneDeep(state);
	newState.shopsDetails.items = [];
	newState.shopsDetails.lastUpdated = action.receivedAt;
	newState.shopsDetails.isFetching = false;
	return newState;
};

const setSearchValue = (state, payload) => {
	let newState = cloneDeep(state);
	newState.search.term = payload;
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

		case REQUEST_SHOPS:
			return setShopsFetching(state, true);
		case RECEIVE_SHOPS:
			return setShops(state, action);
		case RECEIVE_SHOPS_ERROR:
			return setShopsError(state, action);
		case SET_SELECTED_SHOPS:
			return setSelectedShops(state, action.payload);


		case REQUEST_SHOPS_DETAILS:
			return setShopsDetailsFetching(state, true);
		case RECEIVE_SHOPS_DETAILS:
			return setShopsDetails(state, action);
		case RECEIVE_SHOPS_DETAILS_ERROR:
			return setShopsDetailsError(state, action);

		case SET_SEARCH_VALUE:
			return setSearchValue(state, action.payload);
		default:
			return state;
	}
}
