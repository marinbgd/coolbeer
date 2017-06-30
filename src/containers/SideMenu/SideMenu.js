import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SideMenu.scss';

import SideDropDown from '../../components/SideDropDown/SideDropDown';

import { find } from 'lodash';
import {
	SIDEMENU_SET_SELECTED_COUNTRY_ID,
	SIDEMENU_SET_SELECTED_REGION_ID,
	SIDEMENU_SET_SELECTED_CITY_ID,
	FETCH_ALL_COUNTRIES,
	fetchAllCountries,
} from './SideMenu.actions';

class SideMenu extends React.Component {

	constructor(props) {
		super(props);

		this.props.fetchAllCountries();
	}

	onCountryChange(event, index, value) {
		this.props.setSelectedCountry(value);
	}

	onRegionChange(event, index, value) {
		let selectedCountryId = this.props.selectedCountry.id;
		this.props.setSelectedRegion(selectedCountryId, value);
	}

	onCityChange(event, index, value) {
		let selectedCountryId = this.props.selectedCountry.id;
		let selectedRegionId = this.props.selectedRegion.id;
		this.props.setSelectedCity(selectedCountryId, selectedRegionId, value);
	}

	render () {

		let countryDropDown = (
			<SideDropDown
				unselectedText="Select Country..."
				items={this.props.sideMenu.countries}
				selectedItemId={(this.props.selectedCountry && this.props.selectedCountry.id)}
				onSelectionChange={this.onCountryChange.bind(this)}
			/>);

		let regionDropDown = null;
		if (this.props.selectedCountry && this.props.selectedCountry.regions) {
			regionDropDown = (<SideDropDown
				unselectedText="Select Region..."
				items={this.props.selectedCountry.regions}
				selectedItemId={(this.props.selectedRegion && this.props.selectedRegion.id)}
				onSelectionChange={this.onRegionChange.bind(this)}
			/>);
		}

		let cityDropDown = null;
		if (this.props.selectedRegion && this.props.selectedRegion.cities) {
			cityDropDown = (<SideDropDown
				unselectedText="Select City..."
				items={this.props.selectedRegion.cities}
				selectedItemId={(this.props.selectedCity && this.props.selectedCity.id)}
				onSelectionChange={this.onCityChange.bind(this)}
			/>);
		}

		return (
			<aside className="mainSideMenu">

				{countryDropDown}

				{regionDropDown}

				{cityDropDown}

			</aside>
		);
	}
}

SideMenu.propTypes = {
	sideMenu: PropTypes.object.isRequired,
	setSelectedCountry: PropTypes.func.isRequired,
	setSelectedRegion: PropTypes.func.isRequired,
	setSelectedCity: PropTypes.func.isRequired,
	fetchAllCountries: PropTypes.func.isRequired,

	selectedCountry: PropTypes.object,
	selectedRegion: PropTypes.object,
	selectedCity: PropTypes.object,
};

const _getSelectedCountry = (countries) => {
	return find(countries, {'_selected': true});
};

const _getSelectedRegion = (countries) => {
	let selectedCountry = _getSelectedCountry(countries);
	if (selectedCountry && selectedCountry.regions) {
		return find(selectedCountry.regions, {'_selected': true});
	}
};

const _getSelectedCity = (countries) => {
	let selectedRegion = _getSelectedRegion(countries);
	if (selectedRegion && selectedRegion.cities) {
		return find(selectedRegion.cities, {'_selected': true});
	}
};

const mapStateToProps = (state) => {
	return {
		sideMenu: state.sideMenu,

		selectedCountry: _getSelectedCountry(state.sideMenu.countries),
		selectedRegion: _getSelectedRegion(state.sideMenu.countries),
		selectedCity: _getSelectedCity(state.sideMenu.countries),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedCountry: (countryId) => {
			dispatch({
				type: SIDEMENU_SET_SELECTED_COUNTRY_ID,
				payload: {
					countryId,
				}
			});
		},
		setSelectedRegion: (countryId, regionId) => {
			dispatch({
				type: SIDEMENU_SET_SELECTED_REGION_ID,
				payload: {
					countryId,
					regionId,
				}
			});
		},
		setSelectedCity: (countryId, regionId, cityId) => {
			dispatch({
				type: SIDEMENU_SET_SELECTED_CITY_ID,
				payload: {
					countryId,
					regionId,
					cityId,
				}
			});
		},
		fetchAllCountries: () => {
			dispatch(fetchAllCountries());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
