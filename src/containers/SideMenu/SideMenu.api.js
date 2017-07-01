import fetch from 'isomorphic-fetch';
import { API_URL } from '../../constants/config';

const SideMenuApi = {
	fetchAllCountries: () => {
		return fetch(API_URL + '/countries').then(
			response => response.json()
		);
	},

	fetchRegionsForCountryId: (countryId) => {
		return fetch(API_URL + '/regions/' + countryId).then(
			response => response.json()
		);
	},

	fetchCitiesForRegionId: (regionId) => {
		return fetch(API_URL + '/cities/' + regionId).then(
			response => response.json()
		);
	}
};

export default SideMenuApi;
