import { format, parse } from "date-fns";

const normalizeTime = (strDate, inputFormat) => {
	return format(parse(strDate, inputFormat, new Date()), "HHmm");
};

export default normalizeTime;
