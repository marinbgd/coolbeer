import ParentChart from '../ChartParent';
import { cloneDeep } from 'lodash';

class PolarAreaChart extends ParentChart {

	componentDidMount() {
		let chartElement = this.refs.chart;
		let chartData = cloneDeep(this.props.chartData);
		chartData.type = 'polarArea';
		this.chart = new Chart(chartElement, chartData);
	}
}

export default PolarAreaChart;
