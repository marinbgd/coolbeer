import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import BarChart from '../../components/Charts/BarChart/BarChart';
import PieChart from '../../components/Charts/PieChart/PieChart';
import DoughnutChart from '../../components/Charts/DoughnutChart/DoughnutChart';
import PolarAreaChart from '../../components/Charts/PolarAreaChart/PolarAreaChart';
import LineChart from '../../components/Charts/LineChart/LineChart';

import UpdateDataButton from '../../components/UpdateDataButton/UpdateDataButton';

import { HOMEPAGE_SET_NEW_DATA } from '../../containers/Home/HomePage.actions';

const paperStyle = {
	height: '100%',
	width: '100%',
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
};

class Demo extends React.Component {

	constructor(props) {
		super(props);
	}

	onRandomizeDataClick () {
		this.props.setNewData();
	}

	render() {
		return (
			<section className="relative">
				<h2>Demo charts</h2>

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

Demo.propTypes = {
	barChartData: PropTypes.object,
	pieChartData: PropTypes.object,
	setNewData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		barChartData: state.homePage.barChartData,
		pieChartData: state.homePage.pieChartData,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		setNewData: () => {
			dispatch({
				type: HOMEPAGE_SET_NEW_DATA,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
