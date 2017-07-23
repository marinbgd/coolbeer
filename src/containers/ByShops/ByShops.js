import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as actions from './ByShops.actions';

import {find} from 'lodash';

import {cyan500} from 'material-ui/styles/colors';
import {
	CircularProgress,
	FontIcon,
	Avatar,
	Chip,
	Paper,
} from 'material-ui';
import ConsumptionByShopsTable from '../../components/ConsumptionByShopsTable/ConsumptionByShopsTable';
import ConsumptionByShopsChart from '../../components/Charts/ConsumptionByShopsChart/ConsumptionByShopsChart';


import './ByShops.scss';

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

	componentDidMount() {
		let params = {
			startDate: null,
			endDate: null,
		};
		this.props.actions.fetchConsumptionByShops(params);
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
		if (this.props.consumptionByShops.isFetching) {
			dataTable = progressLoader;
		} else if (this.props.consumptionByShops.items.length) {
			dataTable = (
				<Paper style={paperStyle} zDepth={2}>
					<div className="by-shops-compare-graph by-shops-compare-graph--1">
						<ConsumptionByShopsTable data={this.props.consumptionByShops.items} />
					</div>
					<div className="by-shops-compare-graph by-shops-compare-graph--2">
						<ConsumptionByShopsChart shops={this.props.consumptionByShops.items} />
					</div>
				</Paper>
			);
		} else if (!this.props.consumptionByShops.items.length && this.props.consumptionByShops.lastUpdated) {
			dataTable = noTableData;
		}

		return (
			<section className="relative">
				<h2>Compare by Shops</h2>

				<section className="p-">
					<h3 className="text-left color-blue pb-">Consumption by Shop</h3>

					{dataTable}

				</section>

			</section>
		);

	}
}

ComparePage.propTypes = {
	datePickerData: PropTypes.object.isRequired,

	consumptionByShops: PropTypes.object,
	fetchConsumptionByShops: PropTypes.func,

	sideMenu: PropTypes.object,
	selectedCountry: PropTypes.object,
	selectedRegion: PropTypes.object,
	selectedCity: PropTypes.object,

	actions: PropTypes.object.isRequired,
};
const _getSelectedItem = (items) => {
	return find(items, {'_selected': true});
};

const mapStateToProps = (state) => {
	return {
		datePickerData: state.homePage.datePicker,

		consumptionByShops: state.byShops.consumptionByShops,
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
