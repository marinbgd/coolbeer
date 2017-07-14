import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../LineChart/LineChart';
import { getBgColorByIndex } from '../../../common/colors/ColorHelper';
import { cloneDeep, uniqWith, isEqual } from 'lodash';
import { dateHourSortAsc } from '../../../common/DateHelper';
const chartDefault = {
	data: {
		labels: [],
		datasets: [],
	},
	options: {
		scales: {
			xAxes: [{
				ticks: {
					autoSkip: true,
					maxRotation: 60,
					minRotation: 60
				}
			}],
		},
	},
};

const datasetDefault = {
	label: '',
	data: [],
	backgroundColor: [
		'rgba(255, 204, 127, 0.2)',
	],
	borderColor: [
		'rgba(54, 162, 235, 1)',
	],
	borderWidth: 2,
	pointStyle: 'rect',
};



const _addDataSetsFromShop = (chartData, shop) => {
	let newChartData = cloneDeep(chartData);
	shop = cloneDeep(shop);

	for (let i = 1; i < 5; i += 1) {
		let dataset = cloneDeep(datasetDefault);
		dataset.label = 'Line ' + i;
		dataset.borderColor = getBgColorByIndex(i);

		shop.data.forEach( singleData => {
			dataset.data.push(singleData['lin' + i]);
		});

		newChartData.data.datasets.push(dataset);
	}

	return newChartData;
};


class SingleShopDetailedLineChart extends React.Component {
	constructor(props) {
		super(props);

		let data = cloneDeep(chartDefault);
		let labels = _extractLabelDatesFromShop(props.shop);

		data.data.labels = labels;

		this.data = _addDataSetsFromShop(data, props.shop);
	}

	render () {
		return (
			<LineChart chartData={this.data}/>
		);
	}
}

SingleShopDetailedLineChart.propTypes = {
	shop: PropTypes.object.isRequired,
};

export default SingleShopDetailedLineChart;


const _extractLabelDatesFromShop = (shop) => {
	let frequency = _getFrequencyFromShop(shop);
	let labels;
	switch (frequency) {
		case 'daily':
			labels = _getLabelsFromShopDaily(shop);
			break;
		case 'hourly':
			labels = _getLabelsFromShopHourly(shop);
			break;
	}

	return labels;
};

const _getFrequencyFromShop = (shop) => {
	return shop.dataFrequency;
};

const _getLabelsFromShopDaily = (shop) => {
	let labelsArr = shop.data.map(singleData => singleData.day);
	let labelsUniq = uniqWith(labelsArr, isEqual);
	let sortedLabels = labelsUniq.sort();
	return sortedLabels;
};
const _getLabelsFromShopHourly = (shop) => {

	let labelsArr = shop.data.map(singleData => {
		return {
			day: singleData.day,
			hour: singleData.hour,
		};
	});

	let labelsUniq = uniqWith(labelsArr, isEqual);
	let sortedLabels = labelsUniq.sort(dateHourSortAsc);
	let sortedLabelsString = sortedLabels.map( obj => obj.day + ' ' + obj.hour + 'h');
	return sortedLabelsString;
};
