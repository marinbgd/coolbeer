import SideMenuApi from './SideMenu.api';

export const SIDEMENU_SET_SELECTED_COUNTRY_ID = 'SIDEMENU_SET_SELECTED_COUNTRY_ID';
export const SIDEMENU_SET_SELECTED_REGION_ID = 'SIDEMENU_SET_SELECTED_REGION_ID';
export const SIDEMENU_SET_SELECTED_CITY_ID = 'SIDEMENU_SET_SELECTED_CITY_ID';

export const FETCH_ALL_COUNTRIES = 'FETCH_ALL_COUNTRIES';
export const FETCH_ALL_COUNTRIES_SUCCESS = 'FETCH_ALL_COUNTRIES_SUCCESS';

export const fetchAllCountries = () => {
	return (dispatch) => {
		return SideMenuApi.fetchAllCountries()
			.then( countryData => {
				let countries = countryData.data;
				console.log(countries);
				dispatch(loadAllCountriesSuccess(countries));
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
