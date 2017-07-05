import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HomePage.scss';

import {
	HOMEPAGE_SET_NEW_DATA,
	HOMEPAGE_SET_START_DATE,
	HOMEPAGE_SET_END_DATE,
	fetchShops,
	setSearchValue,
} from './HomePage.actions';

import { find } from 'lodash';

import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { cyan500 } from 'material-ui/styles/colors';

import BarChart from '../../components/Charts/BarChart/BarChart';
import PieChart from '../../components/Charts/PieChart/PieChart';
import DoughnutChart from '../../components/Charts/DoughnutChart/DoughnutChart';
import PolarAreaChart from '../../components/Charts/PolarAreaChart/PolarAreaChart';
import LineChart from '../../components/Charts/LineChart/LineChart';

import UpdateDataButton from '../../components/UpdateDataButton/UpdateDataButton';
import CBTable from '../../components/CBTable/CBTable';
import SearchBox from '../../components/SearchBox/SearchBox';

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

	onRandomizeDataClick () {
		this.props.setNewData();
	}

	handleChangeStartDate (event, date) {
		this.props.setStartDate(date);
	}

	handleChangeEndDate (event, date) {
		this.props.setEndDate(date);
	}

	handleGetData () {
		let params = {
			startDate: this.props.datePickerData.startDate,
			endDate: this.props.datePickerData.endDate,
			search: this.props.search.term,
			countryId: this.props.selectedCountry && this.props.selectedCountry.id,
			regionId: this.props.selectedRegion && this.props.selectedRegion.id,
			cityId: this.props.selectedCity && this.props.selectedCity.id,
		};
		this.props.fetchShops(params);
	}

	handleSearchBoxChange(event, text) {
		this.props.setSearchValue(text);
	}

	render() {

		const progressLoader = (<aside className="homePageShopsProgressHolder">
			<CircularProgress mode="indeterminate" size={100} thickness={10}/>
		</aside>);

		const noTableData = (
			<aside className="homePageShopsEmptyWrapper">
				<span className="homePageShopsEmptyHolder">
					<Chip>
						<Avatar icon={<FontIcon color={cyan500} className="material-icons">warning</FontIcon>} />
						No data for selected filters
					</Chip>
				</span>
			</aside>);

		let dataTable;
		if (this.props.shops.isFetching) {
			dataTable = progressLoader;
		} else if (this.props.shops.items.length) {
			dataTable = (
				<section className="p-">
					<h3 className="text-left color-blue pb-">Data visualization:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<CBTable data={this.props.shops.items} />
					</Paper>
				</section>
			);
		} else if (!this.props.shops.items.length && this.props.shops.lastUpdated) {
			dataTable = noTableData;
		}

		return (
			<section className="relative">
				<h1>CoolBeer Dashboard</h1>

				<h2>Get Started</h2>
				<ol>
					<li>Please select country, region and city you are interested in.</li>
					<li>You can select data range to narrow your data</li>
				</ol>

				<aside className="searchShops">
					<SearchBox value={this.props.search.term} onChangeCb={this.handleSearchBoxChange.bind(this)} />
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
						label="Get data"
						secondary={true}
						fullWidth={true}
						onTouchTap={this.handleGetData.bind(this)}
					/>
				</section>

				{dataTable}

				<section style={{overflow:'hidden', position:'relative'}}>
					<h3 className="text-left color-blue p- pb0">Data visualization:</h3>
					<div style={{position:'absolute', bottom: 0, right: '1em'}}>
						<UpdateDataButton onClickFunc={this.onRandomizeDataClick.bind(this)} />
					</div>
				</section>
				<div className="pure-g">
					<div className="pure-u-1-2 p-">
						<Paper style={paperStyle} zDepth={2}>
							<PieChart chartData={this.props.pieChartData} />
						</Paper>
					</div>
					<div className="pure-u-1-2 p-">
						<Paper style={paperStyle} zDepth={2}>
							<BarChart chartData={this.props.barChartData} />
						</Paper>
					</div>
				</div>

				<div className="pure-g">
					<div className="pure-u-1-2 p-">
						<Paper style={paperStyle} zDepth={2}>
							<DoughnutChart chartData={this.props.pieChartData} />
						</Paper>
					</div>
					<div className="pure-u-1-2 p-">
						<Paper style={paperStyle} zDepth={2}>
							<PolarAreaChart chartData={this.props.pieChartData} />
						</Paper>
					</div>
				</div>

				<div className="pure-g">
					<Paper style={paperStyle} zDepth={2}>
						<LineChart chartData={this.props.barChartData} />
					</Paper>
				</div>

			</section>
		);
	}
}

HomePage.propTypes = {
	barChartData: PropTypes.object,
	pieChartData: PropTypes.object,
	datePickerData: PropTypes.object.isRequired,

	shops: PropTypes.object.isRequired,
	search: PropTypes.object,
	setSearchValue: PropTypes.func,

	setNewData: PropTypes.func,
	setStartDate: PropTypes.func,
	setEndDate: PropTypes.func,

	fetchShops: PropTypes.func,

	sideMenu: PropTypes.object,
	selectedCountry: PropTypes.object,
	selectedRegion: PropTypes.object,
	selectedCity: PropTypes.object,
};
const _getSelectedItem = (items) => {
	return find(items, {'_selected': true});
};
const mapStateToProps = (state) => {
	return {
		barChartData: state.homePage.barChartData,
		pieChartData: state.homePage.pieChartData,

		datePickerData: state.homePage.datePicker,
		shops: state.homePage.shops,
		search: state.homePage.search,

		sideMenu: state.sideMenu,
		selectedCountry: _getSelectedItem(state.sideMenu.countries.items),
		selectedRegion: _getSelectedItem(state.sideMenu.regions.items),
		selectedCity: _getSelectedItem(state.sideMenu.cities.items),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNewData: () => {
			dispatch({
				type: HOMEPAGE_SET_NEW_DATA,
			});
		},
		setStartDate: (date) => {
			dispatch({
				type: HOMEPAGE_SET_START_DATE,
				payload: date,
			});
		},
		setEndDate: (date) => {
			dispatch({
				type: HOMEPAGE_SET_END_DATE,
				payload: date,
			});
		},
		fetchShops: (params) => {
			dispatch(fetchShops(params));
		},
		setSearchValue: (value) => {
			dispatch(setSearchValue(value));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
