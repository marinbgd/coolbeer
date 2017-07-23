import {
	REQUEST_CONSUMPTION_BY_SHOPS,
	RECEIVE_CONSUMPTION_BY_SHOPS,
	RECEIVE_CONSUMPTION_BY_SHOPS_ERROR,
} from './ByShops.actions';

import { cloneDeep } from 'lodash';

const initialState = {
	consumptionByShops: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},
};

const setConsumptionShopsFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.consumptionByShops.isFetching = isFetching;
	return newState;
};
const setConsumptionShops = (state, action) => {
	let newState = cloneDeep(state);
	newState.consumptionByShops.items = action.payload || [];
	newState.consumptionByShops.lastUpdated = action.receivedAt;
	newState.consumptionByShops.isFetching = false;
	return newState;
};
const setConsumptionShopsError = (state, action) => {
	let newState = cloneDeep(state);
	newState.consumptionByShops.items = [];
	newState.consumptionByShops.lastUpdated = action.receivedAt;
	newState.consumptionByShops.isFetching = false;
	return newState;
};

export default function byShops (state = initialState, action) {
	switch (action.type) {
		case REQUEST_CONSUMPTION_BY_SHOPS:
			return setConsumptionShopsFetching(state, true);
		case RECEIVE_CONSUMPTION_BY_SHOPS:
			return setConsumptionShops(state, action);
		case RECEIVE_CONSUMPTION_BY_SHOPS_ERROR:
			return setConsumptionShopsError(state, action);
		default:
			return state;
	}
}
