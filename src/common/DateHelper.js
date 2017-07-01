const DateHelper = {

	getStartOfDay: (date) => {
		let processedDate = new Date(date);
		processedDate.setHours(0);
		processedDate.setMinutes(0);
		processedDate.setSeconds(0);
		return processedDate;
	},

	getEndOfDay: (date) => {
		let processedDate = new Date(date);
		processedDate.setHours(23);
		processedDate.setMinutes(59);
		processedDate.setSeconds(59);
		return processedDate;
	},

	getNextMonth: (date) => {
		let processedDate = new Date(date);
		processedDate.setMonth(processedDate.getMonth() + 1);
		return processedDate;
	},

};

export default DateHelper;
