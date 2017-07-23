import React from 'react';
import PropTypes from 'prop-types';
import PolarAreaChart from '../PolarAreaChart/PolarAreaChart';
import { getBgColorByIndex } from '../../../common/colors/ColorHelper';
import { cloneDeep } from 'lodash';
const chartDefault = {
	data: {
		labels: [],
		datasets: [],
	},
	options: {
		legend: {
			display: false,
		},
		layout: {
			padding: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20
			}
		}
	}
};

const datasetDefault = {
	data: [],
	backgroundColor: [
		'rgba(54, 162, 235, 0.2)',
	],
	borderColor: [
		'rgba(54, 162, 235, 1)',
	],
	borderWidth: 1,
	pointStyle: 'rect',
};

const _addDataSetsFromShops = (chartData, shops) => {
	let newChartData = cloneDeep(chartData);
	shops = cloneDeep(shops);

	let dataset = cloneDeep(datasetDefault);
	shops.forEach( (shop, index) => {
		dataset.data.push(shop.totalConsumption);
		dataset.backgroundColor.push( getBgColorByIndex(index));
		dataset.borderColor.push( getBgColorByIndex(index));
	});
	newChartData.data.datasets.push(dataset);

	return newChartData;
};


class ConsumptionByShopsChart extends React.Component {
	constructor(props) {
		super(props);
		let data = cloneDeep(chartDefault);
		let labels = props.shops.map(shop => shop.shopName);
		data.data.labels = labels;
		this.data = _addDataSetsFromShops(data, props.shops);
	}

	render () {
		return (
			<PolarAreaChart chartData={this.data} />
		);
	}
}

ConsumptionByShopsChart.propTypes = {
	shops: PropTypes.array.isRequired,
};

export default ConsumptionByShopsChart;
