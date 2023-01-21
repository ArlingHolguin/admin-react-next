import { format, parse } from "date-fns";

const normalizeDate = (strDate, inputFormat) => {
	return format(parse(strDate, inputFormat, new Date()), "ddMMyy");
};

export default normalizeDate;
