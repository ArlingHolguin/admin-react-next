import { Collapse, Row, Col } from "antd";

import parseDate from "../../../helpers/parseDate";
import parseTime from "../../../helpers/parseTime";

const { Panel } = Collapse;

const SegmentDeepInfo = ({ reservation }) => {
	return (
		<>
			<Collapse
				className="details-segments"
				expandIcon={({ isActive }) =>
					isActive ? (
						<div className="details-label">
							<p>ocultar detalles</p>
							<img width="20px" src="/static/img/arrow_up.svg" />
						</div>
					) : (
						<div className="details-label">
							<p>ver detalles</p>
							<img
								width="20px"
								src="/static/img/arrow_down.svg"
							/>
						</div>
					)
				}
			>
				<Panel header="" key="details">
					{reservation.segments.map((segment) => {
						return (
							<Row className="segment-item">
								<Row type="flex" justify="center">
									<p>Vuelo No.</p>
									<span className="space-word"></span>
									<p>{segment.code_flight}</p>
								</Row>
								<Row
									type="flex"
									justify="space-around"
									className="detail-flight"
									align="middle"
								>
									<Col>
										<p>{parseDate(segment.date_flight)}</p>
										<p className="bold-text">
											{parseTime(segment.time_departure)}
										</p>
										<img
											width="90px"
											src={`/static/aerolineas/${segment.airline}.png`}
										/>
										<div className="airport">
											<p>Aeropuerto</p>
											<p>
												<strong>{segment.airport_code_departure}</strong>
											</p>
											{segment.departure_city && <p>{segment.departure_city}</p>}
										</div>
									</Col>
									<Col className="duration">
										{segment.flight_duration && (
											<>
												<p>Duración</p>
												<p className="bold-text">{`${segment.flight_duration}h`}</p>
											</>
										)}
									</Col>
									<Col>
										<p>{parseDate(segment.arrival_date)}</p>
										<p className="bold-text">
											{parseTime(segment.time_arrival)}
										</p>
										<img
											width="90px"
											src={`/static/aerolineas/${segment.airline}.png`}
										/>
										<div className="airport">
											<p>Aeropuerto</p>
											<p>
												<strong>{segment.airport_code_arrival}</strong>
											</p>
											{segment.arrival_city && <p>{segment.arrival_city}</p>}
										</div>
									</Col>
								</Row>
							</Row>
						);
					})}
				</Panel>
			</Collapse>
		</>
	);
};

export default SegmentDeepInfo;
