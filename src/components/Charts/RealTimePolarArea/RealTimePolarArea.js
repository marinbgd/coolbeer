import React, {Component} from 'react';
import RC2 from 'react-chartjs2';

const data = {
	datasets: [{
		data: [11, 16, 7, 3, 14],
		backgroundColor: [
			'#FF6384',
			'#4BC0C0',
			'#FFCE56',
			'#E7E9ED',
			'#36A2EB'
		],
		label: 'My dataset' // for legend
	}],
	labels: [
		'Red',
		'Green',
		'Yellow',
		'Grey',
		'Blue'
	]
};

class RealTimePolarArea extends Component {
	constructor() {
		super();

		this.interval = this.realTime();
	}

	componentDidMount() {
		this.myChart = this.refs['chart'].getChart();
	}

	componentWillUnmount() {
		clearTimeout(this.interval);
	}

	getData() {
		let data = [];
		for (let i = 0, len = 5; i < len; i++) {
			data.push(parseInt(Math.random() * 50));
		}
		return data;
	}

	realTime() {
		return setInterval(() => {
			this.myChart.data.datasets[0].data = this.getData();
			this.myChart.update();
		}, 1500);
	}

	render() {
		return (
			<RC2 data={data} type="polarArea" ref="chart" />
		);
	}
}

export default RealTimePolarArea;
