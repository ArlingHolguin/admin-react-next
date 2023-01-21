export const parseDuration = (duration) => {
	const drt_arr = duration.split("");
	const hours = `${drt_arr[0]}${drt_arr[1]}`;
	const mins = `${drt_arr[2]}${drt_arr[3]}`;
	return `${hours}:${mins}`;
};

export const parseNDCDuration = (duration) => {
	return duration.slice(0, duration.length - 3);
};
