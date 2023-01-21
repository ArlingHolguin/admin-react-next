import { useFlightDetail } from "../../../context/flightItem.context";
import { Row, Col, Divider } from "antd";

const FlightDetailView = () => {
	const { segmentInfo } = useFlightDetail();
	const { segments, segmentsExtraInfo } = segmentInfo;

	const Seg = ({ idx, segment }) => {
		const departureCityData = segmentsExtraInfo.filter(
			(r) => r.codigo == segment.depCode
		)[0];
		const arrivalCityData = segmentsExtraInfo.filter(
			(r) => r.codigo == segment.arrCode
		)[0];
		const depTime =
			segment.depTime.substring(0, 2) +
			":" +
			segment.depTime.substring(2, 4);
		const arrTime =
			segment.arrTime.substring(0, 2) +
			":" +
			segment.arrTime.substring(2, 4);

		return (
			<Row type="flex" justify="space-around" gutter={10}>
				<Col span={24}>
					<h3>Trayecto {idx + 1}</h3>
				</Col>
				<Col style={{ textAlign: "center" }} span={24}>
					<img
						style={{ maxWidth: "150px" }}
						src={`/static/aerolineas/${segment.airline}.png`}
					/>
					<h4>
						Vuelo n°{" "}
						<span style={{ color: "#DF395D" }}>
							{segment.flightNumber}
						</span>
					</h4>
					<br />

					<h4>Duración: {segment.flightTime}</h4>
				</Col>
				<Col>
					<Row type="flex" gutter={20}>
						<Col>
							<h4>
								Sale:{" "}
								<span style={{ color: "#DF395D" }}>
									{segment.departureDate}
								</span>
							</h4>
							<h4>
								<span style={{ color: "#DF395D" }}>
									{departureCityData.ciudad}
								</span>{" "}
								({segment.depCode})
								<span style={{ color: "#DF395D" }}>
									{depTime}
								</span>
							</h4>
						</Col>
						<Col>
							<h4>
								Llega:{" "}
								<span style={{ color: "#DF395D" }}>
									{segment.departureDate}
								</span>
							</h4>
							<h4>
								<span style={{ color: "#DF395D" }}>
									{arrivalCityData.ciudad}
								</span>{" "}
								({segment.arrCode})
								<span style={{ color: "#DF395D" }}>
									{arrTime}
								</span>
							</h4>
						</Col>
					</Row>
				</Col>
				<Divider />
			</Row>
		);
	};

	return (
		<Row>
			{segments &&
				segments.map((segment, idx) => (
					<Seg idx={idx} segment={segment} />
				))}
		</Row>
	);
};

export default FlightDetailView;
