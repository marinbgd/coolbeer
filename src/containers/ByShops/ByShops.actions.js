import ByShopsApi from './ByShops.api';

export const REQUEST_CONSUMPTION_BY_SHOPS = 'REQUEST_CONSUMPTION_BY_SHOPS';
export const RECEIVE_CONSUMPTION_BY_SHOPS = 'RECEIVE_CONSUMPTION_BY_SHOPS';
export const RECEIVE_CONSUMPTION_BY_SHOPS_ERROR = 'RECEIVE_CONSUMPTION_BY_SHOPS_ERROR';
export function requestConsumptionByShops() {
	return {
		type: REQUEST_CONSUMPTION_BY_SHOPS,
	};
}
export function receiveConsumption(shops) {
	return {
		type: RECEIVE_CONSUMPTION_BY_SHOPS,
		payload: shops,
		receivedAt: Date.now(),
	};
}
export function receiveConsumptionError(error) {
	return {
		type: RECEIVE_CONSUMPTION_BY_SHOPS_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchConsumptionByShops(params) {
	return function (dispatch) {
		dispatch(requestConsumptionByShops());
		return ByShopsApi.fetchConsumptionByShops(params)
			.then( response => {
				let shops = response.data;
				dispatch(receiveConsumption(shops));
			})
			.catch( error => {
				dispatch(receiveConsumptionError(error));
				return error;
			});
	};
}
