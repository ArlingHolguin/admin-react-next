const normalizeDuration = (strDuration) => {
	const arr_dur = strDuration.split(":");
	return `${arr_dur[0]}:${arr_dur[1]}`;
};

export default normalizeDuration;
