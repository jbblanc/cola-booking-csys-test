export const formatDateAsDay = (date: Date): string => {
	if (!date) return "-/-/-";
	return (
		date.getFullYear() +
		"/" +
		(date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
		"/" +
		(date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
	);
};

export const getPreviousDay = (date: Date): Date => {
	const yesterday = new Date(date);
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday;
};

export const getNextDay = (date: Date): Date => {
	const tomorrow = new Date(date);
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow;
};

export const setCleanHour = (date: Date, newHour: number) => {
	date.setHours(newHour);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
};

export const formatWithMeridian = (hour: number) => {
	if (hour <= 11) {
		return hour + "am";
	} else if (hour === 12) {
		return "12pm";
	} else {
		return hour - 12 + "pm";
	}
};
