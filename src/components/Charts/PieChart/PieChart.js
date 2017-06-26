import ParentChart from '../ChartParent';
import { cloneDeep } from 'lodash';

class PieChart extends ParentChart {

	componentDidMount() {
		let chartElement = this.refs.chart;
		let chartData = cloneDeep(this.props.chartData);
		chartData.type = 'pie';
		this.chart = new Chart(chartElement, chartData);
	}
}

export default PieChart;
