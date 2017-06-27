import ParentChart from '../ChartParent';
import { cloneDeep } from 'lodash';
import Chart from 'chart.js';

class BarChart extends ParentChart {

	componentDidMount() {
		let chartElement = this.refs.chart;
		let chartData = cloneDeep(this.props.chartData);
		chartData.type = 'bar';
		this.chart = new Chart(chartElement, chartData);
	}
}

export default BarChart;
