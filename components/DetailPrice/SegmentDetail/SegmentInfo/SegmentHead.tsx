import { Row, Col } from "antd";
import parseDate from "../../../helpers/parseDate";

const SegmentHead = ({ reservation }) => {
	return (
		<>
			<h3>
				{reservation.airport_code_departure} --&gt;{" "}
				{reservation.airport_code_arrival}{" "}
			</h3>
			<h3>{parseDate(reservation.date_flight)}</h3>
			<hr className="breakdown"></hr>
			{reservation.segments.length > 1 ? (
				<Row style={{ padding: "8px 0px" }}>
					<Col>
						<Row type="flex" align="middle">
							{reservation.segments
								.map((s) => s.airline)
								.filter((i, ix) => {
									return (
										reservation.segments
											.map((s) => s.airline)
											.indexOf(i) == ix
									);
								})
								.map((airlaine) => (
									<div style={{ marginLeft: "5px" }}>
										<img
											width="60px"
											src={`/static/aerolineas/${airlaine}.png`}
										/>
									</div>
								))}
						</Row>
					</Col>
				</Row>
			) : (
				<Row type="flex" justify="center">
					<p>Vuelo No.</p>
					<span className="space-word"></span>
					<p>{reservation.code_flight}</p>
				</Row>
			)}
		</>
	);
};

export default SegmentHead;
