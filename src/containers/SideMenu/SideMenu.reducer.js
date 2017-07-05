import {
	REQUEST_COUNTRIES,
	RECEIVE_COUNTRIES,
	RECEIVE_COUNTRIES_ERROR,
	SIDEMENU_SET_SELECTED_COUNTRY_ID,

	REQUEST_REGIONS,
	RECEIVE_REGIONS,
	RECEIVE_REGIONS_ERROR,
	SIDEMENU_SET_SELECTED_REGION_ID,

	REQUEST_CITIES,
	RECEIVE_CITIES,
	RECEIVE_CITIES_ERROR,
	SIDEMENU_SET_SELECTED_CITY_ID,

} from './SideMenu.actions';

import { cloneDeep } from 'lodash';

const initialState = {
	countries: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},

	regions: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},

	cities: {
		isFetching: false,
		lastUpdated: null,
		items: [],
	},
};

const setCountriesFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.countries.isFetching = isFetching;
	return newState;
};
const setCountries = (state, action) => {
	let newState = cloneDeep(state);
	newState.countries.items = action.payload || [];
	newState.countries.lastUpdated = action.receivedAt;
	newState.countries.isFetching = false;
	return newState;
};
const setCountriesError = (state, action) => {
	let newState = cloneDeep(state);
	newState.countries.items = [];
	newState.countries.lastUpdated = action.receivedAt;
	newState.countries.isFetching = false;
	return newState;
};
const setSelectedCountry = (state, {countryId}) => {
	let newState = cloneDeep(state);
	newState.countries.items.forEach( country => country._selected = (country.id === countryId));
	newState.regions.items = [];
	newState.cities.items = [];
	return newState;
};


const setRegionsFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.regions.isFetching = isFetching;
	return newState;
};
const setSelectedRegion = (state, {regionId}) => {
	let newState = cloneDeep(state);
	newState.regions.items.forEach( region => region._selected = (region.id === regionId));
	newState.cities.items = [];
	return newState;
};
const setRegions = (state, action) => {
	let newState = cloneDeep(state);
	newState.regions.items = action.payload || [];
	newState.regions.lastUpdated = action.receivedAt;
	newState.regions.isFetching = false;
	return newState;
};
const setRegionsError = (state, action) => {
	let newState = cloneDeep(state);
	newState.regions.items = [];
	newState.regions.lastUpdated = action.receivedAt;
	newState.regions.isFetching = false;
	return newState;
};


const setCitiesFetching = (state, isFetching) => {
	let newState = cloneDeep(state);
	newState.cities.isFetching = isFetching;
	return newState;
};
const setSelectedCity = (state, {cityId}) => {
	let newState = cloneDeep(state);
	newState.cities.items.forEach( city => city._selected = (city.id === cityId));
	return newState;
};
const setCities = (state, action) => {
	let newState = cloneDeep(state);
	newState.cities.items = action.payload || [];
	newState.cities.lastUpdated = action.receivedAt;
	newState.cities.isFetching = false;
	return newState;
};
const setCitiesError = (state, action) => {
	let newState = cloneDeep(state);
	newState.cities.items = [];
	newState.cities.lastUpdated = action.receivedAt;
	newState.cities.isFetching = false;
	return newState;
};


export default function sideMenu (state = initialState, action) {
	switch (action.type) {
		case REQUEST_COUNTRIES:
			return setCountriesFetching(state, true);
		case RECEIVE_COUNTRIES:
			return setCountries(state, action);
		case RECEIVE_COUNTRIES_ERROR:
			return setCountriesError(state, action);
		case SIDEMENU_SET_SELECTED_COUNTRY_ID:
			return setSelectedCountry(state, action.payload);

		case SIDEMENU_SET_SELECTED_REGION_ID:
			return setSelectedRegion(state, action.payload);
		case REQUEST_REGIONS:
			return setRegionsFetching(state, true);
		case RECEIVE_REGIONS_ERROR:
			return setRegionsError(state, action);
		case RECEIVE_REGIONS:
			return setRegions(state, action);

		case REQUEST_CITIES:
			return setCitiesFetching(state, true);
		case RECEIVE_CITIES:
			return setCities(state, action);
		case RECEIVE_CITIES_ERROR:
			return setCitiesError(state, action);
		case SIDEMENU_SET_SELECTED_CITY_ID:
			return setSelectedCity(state, action.payload);

		default:
			return state;
	}
}
