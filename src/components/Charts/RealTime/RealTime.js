import React, {Component} from 'react';
import RC2 from 'react-chartjs2';

class RealTime extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.myChart = this.refs['chart'].getChart();
		console.log(this.myChart)
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(newProps) {
		console.log(newProps)
		//this.myChart.data.datasets[0].data = this.getData();
		//this.myChart.update();
	}

	render() {
		return (
			<RC2 data={this.props.data} type="polarArea" ref="chart" />
		);
	}
}

export default RealTime;
