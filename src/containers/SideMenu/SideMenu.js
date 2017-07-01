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
	fetchAllCountries,
	fetchRegionsForCountryId,
	fetchCitiesForRegionId,
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
		this.props.setSelectedRegion(value);
	}

	onCityChange(event, index, value) {
		this.props.setSelectedCity(value);
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
		if (this.props.sideMenu.regions && this.props.sideMenu.regions.length) {
			regionDropDown = (<SideDropDown
				unselectedText="Select Region..."
				items={this.props.sideMenu.regions}
				selectedItemId={(this.props.selectedRegion && this.props.selectedRegion.id)}
				onSelectionChange={this.onRegionChange.bind(this)}
			/>);
		}

		let cityDropDown = null;
		if (this.props.sideMenu.cities && this.props.sideMenu.cities.length) {
			cityDropDown = (<SideDropDown
				unselectedText="Select City..."
				items={this.props.sideMenu.cities}
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

const _getSelectedItem = (items) => {
	return find(items, {'_selected': true});
};

const mapStateToProps = (state) => {
	return {
		sideMenu: state.sideMenu,

		selectedCountry: _getSelectedItem(state.sideMenu.countries),
		selectedRegion: _getSelectedItem(state.sideMenu.regions),
		selectedCity: _getSelectedItem(state.sideMenu.cities),
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
			dispatch(fetchRegionsForCountryId(countryId));
		},
		setSelectedRegion: (regionId) => {
			dispatch({
				type: SIDEMENU_SET_SELECTED_REGION_ID,
				payload: {
					regionId,
				}
			});
			dispatch(fetchCitiesForRegionId(regionId));
		},
		setSelectedCity: (cityId) => {
			dispatch({
				type: SIDEMENU_SET_SELECTED_CITY_ID,
				payload: {
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
