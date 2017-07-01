export const HOMEPAGE_SET_NEW_DATA = 'HOMEPAGE_SET_NEW_DATA';

export const HOMEPAGE_SET_START_DATE = 'HOMEPAGE_SET_START_DATE';
export const HOMEPAGE_SET_END_DATE = 'HOMEPAGE_SET_END_DATE';

export const FETCH_HOME_DATA_SUCCESS = 'FETCH_HOME_DATA_SUCCESS';

import HomePageApi from './HomePage.api';

export const fetchHomeData = (params) => {
	return (dispatch) => {
		return HomePageApi.fetchHomeData(params)
			.then( response => {
				let homeData = response.data;
				dispatch(fetchHomeDataSuccess(homeData));
			})
			.catch( error => {
				return error;
			});
	};
};

export function fetchHomeDataSuccess(data) {
	return {
		type: FETCH_HOME_DATA_SUCCESS,
		payload: data
	};
}
