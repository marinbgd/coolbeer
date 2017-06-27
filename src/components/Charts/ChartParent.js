import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

class ChartParent extends React.Component {

	componentWillReceiveProps(newProps) {
		let shouldComponentUpdate = false;

		if ( !isEqual(this.chart.data.datasets[0].data, newProps.chartData.data.datasets[0].data) ) {
			this.chart.data.datasets[0].data = newProps.chartData.data.datasets[0].data;
			shouldComponentUpdate = true;
		}
		if ( !isEqual(this.chart.data.labels, newProps.chartData.data.labels) ) {
			this.chart.data.labels = newProps.chartData.data.labels;
			shouldComponentUpdate = true;
		}

		if (shouldComponentUpdate) {
			this.chart.update(2000);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<canvas ref="chart" />
		);
	}
}

ChartParent.propTypes = {
	chartData: PropTypes.object.isRequired
};

export default ChartParent;
