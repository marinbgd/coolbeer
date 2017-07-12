import colors from './chartColors';

export const getBgColorByIndex = (index) => {
	let colorLength = colors.length;
	let colorIndex = index % colorLength;
	return colors[colorIndex];
};
