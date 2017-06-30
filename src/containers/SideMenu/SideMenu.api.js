import fetch from 'isomorphic-fetch';
import { API_URL } from '../../constants/config';

const SideMenuApi = {
	fetchAllCountries: () => {
		console.log('sidemenu api fetch all countries');

		return fetch(API_URL + '/getCountries').then(
			response => response.json()
		);

		/*return new Promise(
			() => {console.log(11)},
			() => {console.log(22)},
		);*/
	}
};

export default SideMenuApi;
