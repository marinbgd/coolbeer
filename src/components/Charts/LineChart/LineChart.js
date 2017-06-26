import ParentChart from '../ChartParent';
import { cloneDeep } from 'lodash';

class LineChart extends ParentChart {

	componentDidMount() {
		let chartElement = this.refs.chart;
		let chartData = cloneDeep(this.props.chartData);
		chartData.type = 'line';
		this.chart = new Chart(chartElement, chartData);
	}
}

export default LineChart;
