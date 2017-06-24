import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SideMenu.scss';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { find, cloneDeep } from 'lodash';
import {
	SIDEMENU_SET_SELECTED_COUNTRY_ID,
	SIDEMENU_SET_SELECTED_REGION_ID,
	SIDEMENU_SET_SELECTED_CITY_ID
} from './SideMenu.actions';

class SideMenu extends React.Component {

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
		const selectCountryDropDownElement = {
			id: undefined,
			name: 'Select Country ...'
		};
		const selectRegionDropDownElement = {
			id: undefined,
			name: 'Select Region ...'
		};
		const selectCityDropDownElement = {
			id: undefined,
			name: 'Select City ...'
		};

		let countryDropDown = null;
		if (this.props.sideMenu.countries) {
			let countries = cloneDeep(this.props.sideMenu.countries);
			countries.unshift(selectCountryDropDownElement);
			countryDropDown = (<DropDownMenu
				value={(this.props.selectedCountry && this.props.selectedCountry.id)}
				onChange={this.onCountryChange.bind(this)}
				maxHeight={300}>
				{countries.map((country, index) => {
					return <MenuItem key={index} value={country.id} primaryText={country.name} />;
				})}
			</DropDownMenu>);
		}

		let regionDropDown = null;
		if (this.props.selectedCountry && this.props.selectedCountry.regions) {
			let regions = cloneDeep(this.props.selectedCountry.regions);
			regions.unshift(selectRegionDropDownElement);
			regionDropDown = (<DropDownMenu
				value={(this.props.selectedRegion && this.props.selectedRegion.id)}
				onChange={this.onRegionChange.bind(this)}
				maxHeight={300}>
				{regions.map((region, index) => {
					return <MenuItem key={index} value={region.id} primaryText={region.name} />;
				})}
			</DropDownMenu>);
		}

		let cityDropDown = null;
		if (this.props.selectedRegion && this.props.selectedRegion.cities) {
			let cities = cloneDeep(this.props.selectedRegion.cities);
			cities.unshift(selectCityDropDownElement);
			cityDropDown = (<DropDownMenu
				value={(this.props.selectedCity && this.props.selectedCity.id)}
				onChange={this.onCityChange.bind(this)}
				maxHeight={300}>
				{cities.map( (city, index) => {
					return <MenuItem key={index} value={city.id} primaryText={city.name} />;
				})}
			</DropDownMenu>);
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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
