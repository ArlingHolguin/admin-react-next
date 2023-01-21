import parseDate from "../../../helpers/parseDate";
import parseTime from "../../../helpers/parseTime";

const SegmentDatetime = ({ dateFlight, timeFlight }) => {
	return (
		<>
			<p>{parseDate(dateFlight)}</p>
			<p className="bold-text">{parseTime(timeFlight)}</p>
		</>
	);
};

export default SegmentDatetime;
