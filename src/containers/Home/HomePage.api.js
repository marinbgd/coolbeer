import fetch from 'isomorphic-fetch';
import { API_URL } from '../../constants/config';

const HomePageApi = {
	fetchHomeData: ({startDate=null, endDate=null}) => {

		let payload = {
			startDate,
			endDate,
		};

		let config = {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		};

		return fetch(API_URL + '/home', config).then(
			response => response.json()
		);
	},

	fetchShops: ({startDate=null, endDate=null}) => {

		let payload = {
			startDate,
			endDate,
		};

		let config = {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		};

		return fetch(API_URL + '/home', config).then(
			response => response.json()
		);
	},
};

export default HomePageApi;
