import { format, parse } from "date-fns";

const parseDate = (date) =>
	format(parse(date, "ddMMyy", new Date()), "dd/MM/yy");

export default parseDate;
