export const dateHourSortAsc = (date1, date2) => {
	if (date1.day > date2.day) return 1;

	if (date1.day === date2.day && date1.hour > date2.hour ) return 1;
	if (date1.day === date2.day && date1.hour < date2.hour ) return -1;

	if (date1.day < date2.day) return -1;

	return 0;
};

// This is a comparison function that will result in dates being sorted in
// ASCENDING order. As you can see, JavaScript's native comparison operators
// can be used to compare dates. This was news to me.
export const dateSortAsc = (date1, date2) => {
	if (date1 > date2) return 1;
	if (date1 < date2) return -1;
	return 0;
};

export const getStartOfDay = (date) => {
	let processedDate = new Date(date);
	processedDate.setHours(0);
	processedDate.setMinutes(0);
	processedDate.setSeconds(0);
	processedDate.setMilliseconds(0);
	return processedDate;
};

export const getEndOfDay = (date) => {
	let processedDate = new Date(date);
	processedDate.setHours(23);
	processedDate.setMinutes(59);
	processedDate.setSeconds(59);
	processedDate.setMilliseconds(999);
	return processedDate;
};

export const getNextMonth = (date) => {
	let processedDate = new Date(date);
	processedDate.setMonth(processedDate.getMonth() + 1);
	return processedDate;
};
