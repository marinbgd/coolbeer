import fetch from 'isomorphic-fetch';
import {API_URL} from '../../constants/config';

const ByShopsApi = {
	fetchConsumptionByShops: ({ startDate = null, endDate = null, }) => {
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

		return fetch(API_URL + '/consumptionByShops', config).then(
			response => response.json()
		);
	},
};

export default ByShopsApi;
