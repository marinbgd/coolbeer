import {
	SIDEMENU_SET_SELECTED_COUNTRY_ID,
	SIDEMENU_SET_SELECTED_REGION_ID,
	SIDEMENU_SET_SELECTED_CITY_ID,

	FETCH_ALL_COUNTRIES_SUCCESS,
	FETCH_REGIONS_FOR_COUNTRYID_SUCCESS,
	FETCH_CITIES_FOR_REGIONID_SUCCESS,
} from './SideMenu.actions';

import { cloneDeep } from 'lodash';

const initialState = {
	countries: [],
	regions: [],
	cities: []
};

const setSelectedCountry = (state, {countryId}) => {
	let newState = cloneDeep(state);
	newState.countries.forEach( country => country._selected = (country.id === countryId));
	newState.regions = [];
	newState.cities = [];
	return newState;
};

const setSelectedRegion = (state, {regionId}) => {
	let newState = cloneDeep(state);
	newState.regions.forEach( region => region._selected = (region.id === regionId));
	newState.cities = [];
	return newState;
};

const setSelectedCity = (state, {cityId}) => {
	let newState = cloneDeep(state);
	newState.cities.forEach( city => city._selected = (city.id === cityId));
	return newState;
};

const setCountries = (state, countries) => {
	return {
		...state,
		countries
	};
};

const setRegions = (state, regions) => {
	return {
		...state,
		regions
	};
};

const setCities = (state, cities) => {
	return {
		...state,
		cities
	};
};

export default function sideMenu (state = initialState, action) {
	switch (action.type) {
		case SIDEMENU_SET_SELECTED_COUNTRY_ID:
			return setSelectedCountry(state, action.payload);
		case SIDEMENU_SET_SELECTED_REGION_ID:
			return setSelectedRegion(state, action.payload);
		case SIDEMENU_SET_SELECTED_CITY_ID:
			return setSelectedCity(state, action.payload);
		case FETCH_ALL_COUNTRIES_SUCCESS:
			return setCountries(state, action.payload);
		case FETCH_REGIONS_FOR_COUNTRYID_SUCCESS:
			return setRegions(state, action.payload);
		case FETCH_CITIES_FOR_REGIONID_SUCCESS:
			return setCities(state, action.payload);
		default:
			return state;
	}
}
