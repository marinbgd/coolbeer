export const HOMEPAGE_SET_NEW_DATA = 'HOMEPAGE_SET_NEW_DATA';
export const HOMEPAGE_SET_START_DATE = 'HOMEPAGE_SET_START_DATE';
export const HOMEPAGE_SET_END_DATE = 'HOMEPAGE_SET_END_DATE';

import HomePageApi from './HomePage.api';

export const REQUEST_SHOPS = 'REQUEST_SHOPS';
export const RECEIVE_SHOPS = 'RECEIVE_SHOPS';
export const RECEIVE_SHOPS_ERROR = 'RECEIVE_SHOPS_ERROR';
export const SET_SELECTED_SHOPS = 'SET_SELECTED_SHOPS';
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
export function setSelectedShops(selectedShopIds) {
	return {
		type: SET_SELECTED_SHOPS,
		payload: selectedShopIds,
	};
}




export const REQUEST_SHOPS_DETAILS = 'REQUEST_SHOPS_DETAILS';
export const RECEIVE_SHOPS_DETAILS = 'RECEIVE_SHOPS_DETAILS';
export const RECEIVE_SHOPS_DETAILS_ERROR = 'RECEIVE_SHOPS_DETAILS_ERROR';
export function requestShopsDetails() {
	return {
		type: REQUEST_SHOPS_DETAILS,
	};
}
export function receiveShopsDetails(shopsDetails) {
	return {
		type: RECEIVE_SHOPS_DETAILS,
		payload: shopsDetails,
		receivedAt: Date.now(),
	};
}
export function receiveShopsDetailsError(error) {
	return {
		type: RECEIVE_SHOPS_DETAILS_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchShopsDetails(params) {
	return function (dispatch) {
		dispatch(requestShopsDetails());
		return HomePageApi.fetchShopsDetails(params)
			.then( response => {
				let shops = response.data;
				dispatch(receiveShopsDetails(shops));
			})
			.catch( error => {
				dispatch(receiveShopsDetailsError(error));
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



export const SET_SELECTED_FREQUENCY = 'SET_SELECTED_FREQUENCY';
export function setSelectedFrequency(value) {
	return {
		type: SET_SELECTED_FREQUENCY,
		payload: value,
	};
}
