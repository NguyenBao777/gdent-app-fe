export const numberFormat = (number = 0) => {
	const formatter = new Intl.NumberFormat("en-CA").format(number);
	return formatter;
};

export const dateFormat = (date = new Date()) => {
	const day = date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1;
	const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	const year = date.getFullYear();
	const formatter = year + "-" + month + "-" + day;
	return formatter;
};
