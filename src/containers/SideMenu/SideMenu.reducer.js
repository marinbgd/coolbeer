import {
	SIDEMENU_SET_SELECTED_COUNTRY_ID,
	SIDEMENU_SET_SELECTED_REGION_ID,
	SIDEMENU_SET_SELECTED_CITY_ID,
} from './SideMenu.actions';

import { find, cloneDeep } from 'lodash';

const initialState = {
	countries: [
		{
			id: 1,
			name: 'Serbia',
			regions: [
				{
					id: 1,
					name: 'Grad Beograd',
					cities: [
						{
							id: 1,
							name: 'Beograd',
						},
						{
							id: 2,
							name: 'Grocka',
						},
						{
							id: 3,
							name: 'Barajevo',
						},
						{
							id: 4,
							name: 'Obrenovac',
						},
						{
							id: 5,
							name: 'Surcin',
						},
					]
				},
				{
					id: 2,
					name: 'Nisavski okrug',
					cities: [
						{
							id: 1,
							name: 'Nis',
						},
						{
							id: 2,
							name: 'Aleksinac',
						},
						{
							id: 3,
							name: 'Svrljig',
						},
					]
				}
			]
		},
		{
			id: 2,
			name: 'Bulgaria'
		}
	]
};

const setSelectedCountry = (state, {countryId}) => {
	let newState = _resetAllSelectedCountries(state);
	//newState = _resetAllSelectedRegions(newState);

	let foundCountry = find(newState.countries, {id: countryId});
	if (foundCountry) {
		foundCountry._selected = true;
	}

	return newState;
};

const _resetAllSelectedCountries = (state) => {
	let newState = cloneDeep(state);
	newState.countries.forEach(country => country._selected = false);
	return newState;
};

const setSelectedRegion = (state, {countryId, regionId}) => {
	let newState = _resetAllSelectedRegions(state);

	let foundCountry = find(newState.countries, {id: countryId});
	if (foundCountry) {
		foundCountry._selected = true;
		if ((foundCountry.regions && foundCountry.regions.length)) {
			foundCountry.regions.forEach( region => region._selected = (region.id === regionId));
		}
	}

	return newState;
};

const _resetAllSelectedRegions = (state) => {
	let newState = cloneDeep(state);
	newState.countries.forEach(country => {
		if (country.regions) {
			country.regions.forEach( region => region._selected = false);
		}
	});
	return newState;
};

const setSelectedCity = (state, {countryId, regionId, cityId}) => {
	let newState = cloneDeep(state);

	let foundCountry = find(newState.countries, {id: countryId});
	if (foundCountry) {
		foundCountry._selected = true;
		if ((foundCountry.regions && foundCountry.regions.length)) {
			let foundRegion = find(foundCountry.regions, {id: regionId});
			if (foundRegion && foundRegion.cities) {
				foundRegion.cities.forEach(city => city._selected = (city.id === cityId));
			}
		}
	}

	return newState;
};

export default function sideMenu (state = initialState, action) {
	switch (action.type) {
		case SIDEMENU_SET_SELECTED_COUNTRY_ID:
			return setSelectedCountry(state, action.payload);
		case SIDEMENU_SET_SELECTED_REGION_ID:
			return setSelectedRegion(state, action.payload);
		case SIDEMENU_SET_SELECTED_CITY_ID:
			return setSelectedCity(state, action.payload);
		default:
			return state;
	}
}
