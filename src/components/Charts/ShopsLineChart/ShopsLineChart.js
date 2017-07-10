import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../LineChart/LineChart';
import { union, cloneDeep } from 'lodash';

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


const colors = [
	'rgba(0, 188, 212, 0.3)',
	'rgba(158, 110, 74, 0.3)',
	'rgba(79, 247, 182, 0.3)',
	'rgba(247, 140, 9, 0.3)',
	'rgba(160, 9, 247, 0.3)',
	'rgba(249, 9, 81, 0.3)',
	'rgba(9, 247, 49, 0.3)',
];



const _getBgColorByIndex = (colors, index) => {
	let colorLength = colors.length;
	let colorIndex = index % colorLength;
	return colors[colorIndex];
};

const _extractDataSetFromShop = (shop, index) => {
	let dataset = cloneDeep(datasetDefault);
	dataset.label = shop.sn;

	//get backgroundColor by index
	dataset.backgroundColor = _getBgColorByIndex(colors, index);

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
		let labels = extractLabelDatesFromShops(props.shops);

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


/*const dateSortAsc = (date1, date2) => {
	// This is a comparison function that will result in dates being sorted in
	// ASCENDING order. As you can see, JavaScript's native comparison operators
	// can be used to compare dates. This was news to me.
	if (date1 > date2) return 1;
	if (date1 < date2) return -1;
	return 0;
};*/

const dateHourSortAsc = (date1, date2) => {
	if (date1.day > date2.day) return 1;

	if (date1.day === date2.day && date1.hour > date2.hour ) return 1;
	if (date1.day === date2.day && date1.hour < date2.hour ) return -1;

	if (date1.day < date2.day) return -1;

	return 0;
};

/*const getDayMonthYearFromDate = (date) => {
	return (date.getDate()) + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
};*/

const extractLabelDatesFromShops = (shops) => {
	let labelsArr = shops.map(shop => {
		return shop.data.map(singleData => {
			return {
				day: singleData.day,
				hour: singleData.hour,
			};
		});
	});
	let labels = union(...labelsArr);

	let sortedLabels = labels.sort(dateHourSortAsc);

	//convert back to string
	sortedLabels = sortedLabels.map( obj => obj.day + ' ' + obj.hour);
	return sortedLabels;
};
