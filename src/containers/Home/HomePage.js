import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './HomePage.scss';

import {bindActionCreators} from 'redux';
import * as actions from './HomePage.actions';

import {filter, find} from 'lodash';

import {cyan500} from 'material-ui/styles/colors';
import {
	Paper,
	RaisedButton,
	DatePicker,
	CircularProgress,
	SelectField,
	FontIcon,
	MenuItem,
	Avatar,
	Chip,
} from 'material-ui';

import ShopsLineChart from '../../components/Charts/ShopsLineChart/ShopsLineChart';
import ShopsTable from '../../components/ShopsTable/ShopsTable';
import ShopsDetailsTable from '../../components/ShopsDetailsTable/ShopsDetailsTable';
import SearchBox from '../../components/SearchBox/SearchBox';
import CbMap from '../../components/CbMap/CbMap';
import CircleWidget from '../../components/CircleWidget/CircleWidget';
import {getBgColorByIndex} from '../../common/colors/ColorHelper';

const paperStyle = {
	height: '100%',
	width: '100%',
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
};

class HomePage extends React.Component {

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

	handleChangeStartDate(event, date) {
		this.props.setStartDate(date);
	}

	handleChangeEndDate(event, date) {
		this.props.setEndDate(date);
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

	handleSearchBoxChange(event, text) {
		this.props.actions.setSearchValue(text);
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
						<ShopsTable data={this.props.shops.items} onRowSelection={this.handleRowSelection.bind(this)}
						/>
					</Paper>
				</section>
			);
		} else if (!this.props.shops.items.length && this.props.shops.lastUpdated) {
			dataTable = noTableData;
		}


		let selectedShopsDetailsTable;
		if (this.props.shopsDetails.isFetching) {
			selectedShopsDetailsTable = progressLoader;
		} else if (this.props.shopsDetails.items.length) {
			selectedShopsDetailsTable = (
				<section className="p-">
					<h3 className="text-left color-blue pb-">Selected shops details:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<ShopsDetailsTable data={this.props.shopsDetails.items}/>
					</Paper>
				</section>
			);
		} else if (!this.props.shopsDetails.items.length && this.props.shopsDetails.lastUpdated) {
			selectedShopsDetailsTable = noTableData;
		}

		let selectedShopsDetailsChart;
		if (this.props.shopsDetails.isFetching) {
			selectedShopsDetailsChart = progressLoader;
		} else if (this.props.shopsDetails.items.length) {
			selectedShopsDetailsChart = (
				<section style={{overflow: 'hidden', position: 'relative'}}>
					<h3 className="text-left color-blue p- pb0">Data visualization:</h3>
					<Paper style={paperStyle} zDepth={2}>

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

						<ShopsLineChart shops={this.props.shopsDetails.items} />
					</Paper>
				</section>
			);
		}


		let selectedShopsSums;
		if (this.props.shopsDetails.items.length) {
			let title = 'Total Consumption';
			selectedShopsSums = (
				<section className="p-">
					{this.props.shopsDetails.items.map((shop, index) =>
						(<CircleWidget key={shop.sn} color={getBgColorByIndex(index)} text={shop.dataSums.totalConsumption} tooltip={shop.shopName + ' / ' + shop.sn} title={title}/>)
					)}

				</section>
			);
		}


		let selectedShopsMap;
		if (this.props.selectedShops && this.props.selectedShops.length) {
			let markers = this.props.selectedShops.map(shop => ( shop.mapMarker ));
			selectedShopsMap = (
				<section className="p-">
					<h3 className="text-left color-blue pb-">Selected shops on maps:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<div className="pure-u-1-1 position-relative" style={{height: '400px', width: '100%'}}>
							<CbMap markers={markers}/>
						</div>
					</Paper>
				</section>
			);
		}
		return (
			<section className="relative">
				<h2>Get Started</h2>
				<ol>
					<li>Please select country, region and city you are interested in.</li>
					<li>You can select data range to narrow your data</li>
				</ol>

				<aside className="searchShops">
					<SearchBox value={this.props.search.term} onChangeCb={this.handleSearchBoxChange.bind(this)}/>
				</aside>

				<section className="p-">
					<h3 className="text-left color-blue pb-">Please select data range:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<div className="pure-g">
							<div className="pure-u-1-2">
								<DatePicker
									onChange={this.handleChangeStartDate.bind(this)}
									autoOk={true}
									floatingLabelText="Start Date"
									value={this.props.datePickerData.startDate}
								/>
							</div>
							<div className="pure-u-1-2">
								<DatePicker
									onChange={this.handleChangeEndDate.bind(this)}
									autoOk={true}
									floatingLabelText="End Date"
									value={this.props.datePickerData.endDate}
								/>
							</div>
						</div>
					</Paper>
				</section>

				<section className="p-">
					<RaisedButton
						label="Get shops"
						secondary={true}
						fullWidth={true}
						onTouchTap={this.handleGetData.bind(this)}
					/>
				</section>

				{dataTable}

				{selectedShopsDetailsTable}

				{selectedShopsSums}

				{selectedShopsDetailsChart}

				{selectedShopsMap}

			</section>
		);

	}
}


HomePage.propTypes = {
	datePickerData: PropTypes.object.isRequired,

	shops: PropTypes.object.isRequired,
	shopsDetails: PropTypes.object.isRequired,
	selectedShops: PropTypes.array,
	search: PropTypes.object,
	setSearchValue: PropTypes.func,

	setStartDate: PropTypes.func,
	setEndDate: PropTypes.func,

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
		setStartDate: date => {
			dispatch({
				type: actions.HOMEPAGE_SET_START_DATE,
				payload: date,
			});
		},
		setEndDate: date => {
			dispatch({
				type: actions.HOMEPAGE_SET_END_DATE,
				payload: date,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
