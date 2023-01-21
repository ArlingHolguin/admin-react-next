import { Col } from "antd";
import SegmentAirline from "./SegmentAirline";
import SegmentAirport from "./SegmentAriport";
import SegmentDatetime from "./SegmentDatetime";

const SegmentInfo = ({ reservation, isArrival = false }) => {
	return (
		<Col>
			<SegmentDatetime
				dateFlight={
					isArrival
						? reservation.arrival_date
						: reservation.date_flight
				}
				timeFlight={
					isArrival
						? reservation.time_arrival
						: reservation.time_departure
				}
			/>
			<SegmentAirline reservation={reservation} />
			<SegmentAirport
				cityName={
					isArrival
						? reservation.arrival_city
						: reservation.departure_city
				}
				airportCode={
					isArrival
						? reservation.airport_code_arrival
						: reservation.airport_code_departure
				}
			/>
		</Col>
	);
};

export default SegmentInfo;
