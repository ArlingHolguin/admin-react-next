import { Col, Row } from "antd";
import TravelDistance from "./child/travel-distance";
import "../../assets/components/consult-reservation/reserve.less";
import { formatDates } from "./child/tabs/flights";
import { ISegment } from "../../models/misReservas.model";
import formatter from "../../lib/priceFormatter";

interface Props {
	segment?: ISegment;
}

const ReserveInformation: React.FC<Props> = ({ segment }) => {
	return (
		<Row id="flights" type="flex" justify="space-between" align="middle">
			<Col id="airline-flight">
				<img src={`/static/aerolineas/${segment.airline}.png`} />
				<h4>Vuelo: {segment.flightNumber}</h4>
			</Col>
			<TravelDistance segment={segment} />
			<Col id="fligth-dates">
				<h4>{formatDates(segment.departureDate)}</h4>
				<h4>
					Clase <br className="sm-hide" /> {segment.flightClass}
				</h4>
			</Col>
		</Row>
	);
};

export default ReserveInformation;
