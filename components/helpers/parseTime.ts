import { format, parse } from "date-fns";

const parseTime = (time) => format(parse(time, "HHmm", new Date()), "HH:mm");

export default parseTime;
