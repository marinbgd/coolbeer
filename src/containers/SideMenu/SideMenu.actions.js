import SideMenuApi from './SideMenu.api';

export const SIDEMENU_SET_SELECTED_COUNTRY_ID = 'SIDEMENU_SET_SELECTED_COUNTRY_ID';
export const SIDEMENU_SET_SELECTED_REGION_ID = 'SIDEMENU_SET_SELECTED_REGION_ID';
export const SIDEMENU_SET_SELECTED_CITY_ID = 'SIDEMENU_SET_SELECTED_CITY_ID';

export const FETCH_ALL_COUNTRIES_SUCCESS = 'FETCH_ALL_COUNTRIES_SUCCESS';
export const FETCH_REGIONS_FOR_COUNTRYID_SUCCESS = 'FETCH_REGIONS_FOR_COUNTRYID_SUCCESS';
export const FETCH_CITIES_FOR_REGIONID_SUCCESS = 'FETCH_CITIES_FOR_REGIONID_SUCCESS';

export const fetchAllCountries = () => {
	return (dispatch) => {
		return SideMenuApi.fetchAllCountries()
			.then( countryData => {
				let countries = countryData.data;
				dispatch(loadAllCountriesSuccess(countries));
			})
			.catch( error => {
				return error;
			});
	};
};

export const fetchRegionsForCountryId = (countryId) => {
	return (dispatch) => {
		return SideMenuApi.fetchRegionsForCountryId(countryId)
			.then( response => {
				let regions = response.data;
				dispatch(loadRegionsForCountryIdSuccess(regions));
			})
			.catch( error => {
				return error;
			});
	};
};

export const fetchCitiesForRegionId = (regionId) => {
	return (dispatch) => {
		return SideMenuApi.fetchCitiesForRegionId(regionId)
			.then( response => {
				let cities = response.data;
				dispatch(loadCitiesForRegionIdSuccess(cities));
			})
			.catch( error => {
				return error;
			});
	};
};

export function loadAllCountriesSuccess(countries) {
	return {
		type: FETCH_ALL_COUNTRIES_SUCCESS,
		payload: countries
	};
}

export function loadRegionsForCountryIdSuccess(regions) {
	return {
		type: FETCH_REGIONS_FOR_COUNTRYID_SUCCESS,
		payload: regions
	};
}

export function loadCitiesForRegionIdSuccess(cities) {
	return {
		type: FETCH_CITIES_FOR_REGIONID_SUCCESS,
		payload: cities
	};
}
