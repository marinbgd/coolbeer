import fetch from 'isomorphic-fetch';
import { API_URL } from '../../constants/config';

const HomePageApi = {
	fetchShops: ({
		startDate=null,
		endDate=null,
		search=null,
        countryId=null,
        regionId=null,
        cityId=null,
	}) => {

		let payload = {
			startDate,
			endDate,
			search,
			countryId,
			regionId,
			cityId,
		};

		let config = {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		};

		return fetch(API_URL + '/shops', config).then(
			response => response.json()
		);
	},

	fetchShopsDetails: ({
        startDate=null,
        endDate=null,
        shopIds = [],
    }) => {

		let payload = {
			startDate,
			endDate,
			shopIds,
		};

		let config = {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		};

		return fetch(API_URL + '/shopDetails', config).then(
			response => response.json()
		);
	},

};

export default HomePageApi;
