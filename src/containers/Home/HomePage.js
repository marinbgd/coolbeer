import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

import { HOMEPAGE_SET_NEW_DATA } from './HomePage.actions';

import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';

import BarChart from '../../components/Charts/BarChart/BarChart';
import PieChart from '../../components/Charts/PieChart/PieChart';
import DoughnutChart from '../../components/Charts/DoughnutChart/DoughnutChart';
import PolarAreaChart from '../../components/Charts/PolarAreaChart/PolarAreaChart';
import LineChart from '../../components/Charts/LineChart/LineChart';

import UpdateDataButton from '../../components/UpdateDataButton/UpdateDataButton';



const paperStyle = {
	height: '100%',
	width: '100%',
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
};

class HomePage extends React.Component {

	onRandomizeDataClick () {
		this.props.setNewData();
	}

	handleChangeMinDate (event, date) {
		console.log(date);
	}

	handleChangeMaxDate (event, date) {
		console.log(date);
	}

	render() {
		return (
			<section className="relative">
				<h1>CoolBeer Dashboard</h1>

				<h2>Get Started</h2>
				<ol>
					<li>Please select country, region and city you are interested in.</li>
					<li>You can select data range to narrow your data</li>
				</ol>

				<section className="p-">
					<h3 className="text-left color-blue pb-">Please select data range:</h3>
					<Paper style={paperStyle} zDepth={2}>
						<div className="pure-g">
							<div className="pure-u-1-2">
								<DatePicker
									onChange={this.handleChangeMinDate}
									autoOk={true}
									floatingLabelText="Start Date"
								/>
							</div>
							<div className="pure-u-1-2">
								<DatePicker
									onChange={this.handleChangeMaxDate}
									autoOk={true}
									floatingLabelText="End Date"
								/>
							</div>
						</div>
					</Paper>
				</section>

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
	setNewData: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		barChartData: state.homePage.barChartData,
		pieChartData: state.homePage.pieChartData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNewData: () => {
			dispatch({
				type: HOMEPAGE_SET_NEW_DATA,
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
