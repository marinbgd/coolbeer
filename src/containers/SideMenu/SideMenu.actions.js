import SideMenuApi from './SideMenu.api';

export const SIDEMENU_SET_SELECTED_COUNTRY_ID = 'SIDEMENU_SET_SELECTED_COUNTRY_ID';
export const SIDEMENU_SET_SELECTED_REGION_ID = 'SIDEMENU_SET_SELECTED_REGION_ID';
export const SIDEMENU_SET_SELECTED_CITY_ID = 'SIDEMENU_SET_SELECTED_CITY_ID';

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';
export const RECEIVE_COUNTRIES_ERROR = 'RECEIVE_COUNTRIES_ERROR';
export function requestCountries() {
	return {
		type: REQUEST_COUNTRIES,
	};
}
export function receiveCountries(countries) {
	return {
		type: RECEIVE_COUNTRIES,
		payload: countries,
		receivedAt: Date.now(),
	};
}
export function receiveCountriesError(error) {
	return {
		type: RECEIVE_COUNTRIES_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchCountries() {
	return function (dispatch) {
		dispatch(requestCountries());
		return SideMenuApi.fetchAllCountries()
			.then( response => {
				let countries = response.data;
				dispatch(receiveCountries(countries));
			})
			.catch( error => {
				dispatch(receiveCountriesError(error));
				return error;
			});
	};
}


export const REQUEST_REGIONS = 'REQUEST_REGIONS';
export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';
export const RECEIVE_REGIONS_ERROR = 'RECEIVE_REGIONS_ERROR';
export function requestRegions() {
	return {
		type: REQUEST_REGIONS,
	};
}
export function receiveRegions(regions) {
	return {
		type: RECEIVE_REGIONS,
		payload: regions,
		receivedAt: Date.now(),
	};
}
export function receiveRegionsError(error) {
	return {
		type: RECEIVE_REGIONS_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchRegions(countryId) {
	return function (dispatch) {
		dispatch(requestRegions());
		return SideMenuApi.fetchRegionsForCountryId(countryId)
			.then( response => {
				let regions = response.data;
				dispatch(receiveRegions(regions));
			})
			.catch( error => {
				dispatch(receiveRegionsError(error));
				return error;
			});
	};
}


export const REQUEST_CITIES = 'REQUEST_CITIES';
export const RECEIVE_CITIES = 'RECEIVE_CITIES';
export const RECEIVE_CITIES_ERROR = 'RECEIVE_CITIES_ERROR';
export function requestCities() {
	return {
		type: REQUEST_CITIES,
	};
}
export function receiveCities(cities) {
	return {
		type: RECEIVE_CITIES,
		payload: cities,
		receivedAt: Date.now(),
	};
}
export function receiveCitiesError(error) {
	return {
		type: RECEIVE_CITIES_ERROR,
		error: error,
		receivedAt: Date.now(),
	};
}
export function fetchCities(regionId) {
	return function (dispatch) {
		dispatch(requestCities());
		return SideMenuApi.fetchCitiesForRegionId(regionId)
			.then( response => {
				let cities = response.data;
				dispatch(receiveCities(cities));
			})
			.catch( error => {
				dispatch(receiveCitiesError(error));
				return error;
			});
	};
}
