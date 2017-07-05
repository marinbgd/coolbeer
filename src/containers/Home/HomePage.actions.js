export const HOMEPAGE_SET_NEW_DATA = 'HOMEPAGE_SET_NEW_DATA';
export const HOMEPAGE_SET_START_DATE = 'HOMEPAGE_SET_START_DATE';
export const HOMEPAGE_SET_END_DATE = 'HOMEPAGE_SET_END_DATE';

import HomePageApi from './HomePage.api';

export const REQUEST_SHOPS = 'REQUEST_SHOPS';
export const RECEIVE_SHOPS = 'RECEIVE_SHOPS';
export const RECEIVE_SHOPS_ERROR = 'RECEIVE_SHOPS_ERROR';
export function requestShops() {
	return {
		type: REQUEST_SHOPS,
	};
}
export function receiveShops(shops) {
	return {
		type: RECEIVE_SHOPS,
		payload: shops,
		receivedAt: Date.now(),
	};
}
export function receiveShopsError(error) {
	return {
		type: RECEIVE_SHOPS_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchShops(params) {
	return function (dispatch) {
		dispatch(requestShops());
		return HomePageApi.fetchShops(params)
			.then( response => {
				let shops = response.data;
				dispatch(receiveShops(shops));
			})
			.catch( error => {
				dispatch(receiveShopsError(error));
				return error;
			});
	};
}

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export function setSearchValue(value) {
	return {
		type: SET_SEARCH_VALUE,
		payload: value,
	};
}
