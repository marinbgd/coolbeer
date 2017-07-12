import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../LineChart/LineChart';
import { getBgColorByIndex } from '../../../common/colors/ColorHelper';
import { union, cloneDeep, uniqWith, isEqual } from 'lodash';
import { dateHourSortAsc } from '../../../common/DateHelper';
const chartDefault = {
	data: {
		labels: [],
		datasets: [],
	},
};

const datasetDefault = {
	label: '',
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

const _extractDataSetFromShop = (shop, index) => {
	let dataset = cloneDeep(datasetDefault);
	dataset.label = shop.sn;

	//get backgroundColor by index
	dataset.backgroundColor = getBgColorByIndex(index);

	shop.data.forEach(singleData => {
		dataset.data.push(singleData.lin1);
	});

	return dataset;
};

const _addDataSetsFromShops = (chartData, shops) => {
	let newChartData = cloneDeep(chartData);
	shops = cloneDeep(shops);

	shops.forEach( (shop, index) => {
		let dataset = _extractDataSetFromShop(shop, index);
		newChartData.data.datasets.push(dataset);
	});

	return newChartData;
};


class ShopsLineChart extends React.Component {
	constructor(props) {
		super(props);

		let data = cloneDeep(chartDefault);
		let labels = _extractLabelDatesFromShops(props.shops);

		data.data.labels = labels;
		this.data = _addDataSetsFromShops(data, props.shops);
	}

	render () {
		return (
			<LineChart chartData={this.data}/>
		);
	}
}

ShopsLineChart.propTypes = {
	shops: PropTypes.array.isRequired,
};

export default ShopsLineChart;


const _extractLabelDatesFromShops = (shops) => {
	let frequency = _getFrequencyFromShops(shops);
	let labels;
	switch (frequency) {
		case 'daily':
			labels = _getLabelsFromShopsDaily(shops);
			break;
		case 'hourly':
			labels = _getLabelsFromShopsHourly(shops);
			break;
	}

	return labels;
};

const _getFrequencyFromShops = (shops) => {
	if (shops && shops.length) {
		return shops[0].dataFrequency;
	}
};

const _getLabelsFromShopsDaily = (shops) => {
	let labelsArr = shops.map(shop => shop.data.map(singleData => singleData.day));
	let labels = union(...labelsArr);
	let sortedLabels = labels.sort();
	return sortedLabels;
};
const _getLabelsFromShopsHourly = (shops) => {
	let labelsArr =  shops.map(shop => {
		return shop.data.map(singleData => {
			return {
				day: singleData.day,
				hour: singleData.hour,
			};
		});
	});
	let labels = union(...labelsArr);
	let labelsUniq = uniqWith(labels, isEqual);
	let sortedLabels = labelsUniq.sort(dateHourSortAsc);
	let sortedLabelsString = sortedLabels.map( obj => obj.day + ' ' + obj.hour + 'h');
	return sortedLabelsString;
};

