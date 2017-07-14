import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as actions from '../Home/HomePage.actions';

import {filter, find} from 'lodash';

import {cyan500} from 'material-ui/styles/colors';
import {
	Paper,
	RaisedButton,
	CircularProgress,
	SelectField,
	FontIcon,
	MenuItem,
	Avatar,
	Chip,
} from 'material-ui';

import ShopsTable from '../../components/ShopsTable/ShopsTable';
import SingleShopDetailedLineChart from '../../components/Charts/SingleShopDetailedLineChart/SingleShopDetailedLineChart';

import './ComparePage.scss';

const paperStyle = {
	height: '100%',
	width: '100%',
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
};

class ComparePage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate(nextProps) {
		if (this._shouldShopsDetailsUpdate(this.props, nextProps)) {
			let selectedShops = nextProps.selectedShops.map(shop => shop.sn);
			this._fetchShopsDetails(nextProps, selectedShops);
		}
	}

	_shouldShopsDetailsUpdate(oldProps, newProps) {
		let result = false;
		if (oldProps.selectedFrequency.value !== newProps.selectedFrequency.value) {
			result = true;
		}
		return result;
	}

	handleRowSelection(selectedRowIds) {
		this.props.actions.setSelectedShops(selectedRowIds);
		this._fetchShopsDetails(this.props, selectedRowIds);
	}

	handleGetData() {
		this._fetchShops();
	}

	_fetchShops() {
		let params = {
			startDate: this.props.datePickerData.startDate,
			endDate: this.props.datePickerData.endDate,
			search: this.props.search.term,
			countryId: this.props.selectedCountry && this.props.selectedCountry.id,
			regionId: this.props.selectedRegion && this.props.selectedRegion.id,
			cityId: this.props.selectedCity && this.props.selectedCity.id,
		};
		this.props.actions.fetchShops(params);
	}

	_fetchShopsDetails(props, selectedRowIds) {
		let params = {
			startDate: props.datePickerData.startDate,
			endDate: props.datePickerData.endDate,
			shopIds: selectedRowIds,
			frequency: props.selectedFrequency && props.selectedFrequency.value,
		};
		this.props.actions.fetchShopsDetails(params);
	}

	handleFrequencyChange(event, index, value) {
		this.props.actions.setSelectedFrequency(value);
	}

	render() {
		const progressLoader = (<aside className="homePageShopsProgressHolder">
			<CircularProgress mode="indeterminate" size={100} thickness={10}/>
		</aside>);

		const noTableData = (
			<aside className="homePageShopsEmptyWrapper">
				<span className="homePageShopsEmptyHolder">
					<Chip>
						<Avatar icon={<FontIcon color={cyan500} className="material-icons">warning</FontIcon>}/>
						No shops for selected filters
					</Chip>
				</span>
			</aside>);

		let dataTable;
		if (this.props.shops.isFetching) {
			dataTable = progressLoader;
		} else if (this.props.shops.items.length) {
			dataTable = (
				<section className="p-">
					<h3 className="text-left color-blue pb-">Available shops:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<ShopsTable data={this.props.shops.items} onRowSelection={this.handleRowSelection.bind(this)} maxSelected={2}
						/>
					</Paper>
				</section>
			);
		} else if (!this.props.shops.items.length && this.props.shops.lastUpdated) {
			dataTable = noTableData;
		}

		let singleShopDetailChart1;
		if (this.props.shopsDetails && this.props.shopsDetails.items && this.props.shopsDetails.items[0]) {
			singleShopDetailChart1 = (
				<div>
					<h5 className="color-blue text-left p0 m0">{this.props.shopsDetails.items[0].shopName}</h5>
					<SingleShopDetailedLineChart shop={this.props.shopsDetails.items[0]} />
				</div>
			);
		}

		let singleShopDetailChart2;
		if (this.props.shopsDetails && this.props.shopsDetails.items && this.props.shopsDetails.items[1]) {
			singleShopDetailChart2 = (
				<div>
					<h5 className="color-blue text-left p0 m0">{this.props.shopsDetails.items[1].shopName}</h5>
					<SingleShopDetailedLineChart shop={this.props.shopsDetails.items[1]} />
				</div>
			);
		}

		let dataCharts;
		if (singleShopDetailChart1 || singleShopDetailChart2) {
			dataCharts = (
				<section className="p- chart-holder">
					<h3 className="text-left color-blue pb-">Compare visualization:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<div className="compare-graph compare-graph--1">
							{singleShopDetailChart1}
						</div>
						<div className="compare-graph compare-graph--2">
							{singleShopDetailChart2}
						</div>
					</Paper>
				</section>
			);
		}

		let getShopsButton;
		if (!this.props.shops.items.length) {
			getShopsButton = (
				<section className="p-">
					<RaisedButton
						label="Get shops"
						secondary={true}
						fullWidth={true}
						onTouchTap={this.handleGetData.bind(this)}
					/>
				</section>
			);
		}

		return (
			<section className="relative">
				<h2>Compare</h2>
				<ol>
					<li>Please select 2 shops to compare</li>
				</ol>

				<SelectField
					style={{
						textAlign: 'left',
						float: 'right',
						clear: 'right',
					}}
					floatingLabelText="Frequency"
					value={this.props.selectedFrequency && this.props.selectedFrequency.value}
					onChange={this.handleFrequencyChange.bind(this)}
				>
					{this.props.frequencies.map(freq => (
						<MenuItem key={freq.value} value={freq.value} primaryText={freq.label}/>
					))}
				</SelectField>

				{getShopsButton}

				{dataTable}

				{dataCharts}

			</section>
		);

	}
}

ComparePage.propTypes = {
	datePickerData: PropTypes.object.isRequired,
	shops: PropTypes.object.isRequired,
	shopsDetails: PropTypes.object.isRequired,
	selectedShops: PropTypes.array,
	search: PropTypes.object,

	fetchShops: PropTypes.func,
	fetchShopsDetails: PropTypes.func,
	setSelectedShops: PropTypes.func,

	frequencies: PropTypes.array,
	selectedFrequency: PropTypes.object,

	sideMenu: PropTypes.object,
	selectedCountry: PropTypes.object,
	selectedRegion: PropTypes.object,
	selectedCity: PropTypes.object,

	actions: PropTypes.object.isRequired,
};
const _getSelectedItem = (items) => {
	return find(items, {'_selected': true});
};
const _getSelectedItems = (items) => {
	return filter(items, {'_selected': true});
};
const mapStateToProps = (state) => {
	return {
		datePickerData: state.homePage.datePicker,
		shops: state.homePage.shops,
		shopsDetails: state.homePage.shopsDetails,
		selectedShops: _getSelectedItems(state.homePage.shops.items),
		search: state.homePage.search,

		frequencies: state.homePage.frequencies,
		selectedFrequency: _getSelectedItem(state.homePage.frequencies),

		sideMenu: state.sideMenu,
		selectedCountry: _getSelectedItem(state.sideMenu.countries.items),
		selectedRegion: _getSelectedItem(state.sideMenu.regions.items),
		selectedCity: _getSelectedItem(state.sideMenu.cities.items),
	};
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);
