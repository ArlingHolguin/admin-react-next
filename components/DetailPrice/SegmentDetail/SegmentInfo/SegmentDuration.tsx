import { Col } from "antd";

const SegmentDuration = ({ reservation }) => {
	return (
		<Col className="duration">
			{reservation.flight_duration && (
				<>
					<p>Duración</p>
					<p className="bold-text">{`${reservation.flight_duration}h`}</p>
				</>
			)}
			{reservation.segments.length > 1 ? (
				<p>{reservation.segments.length - 1} escalas</p>
			) : (
				<p>Directo</p>
			)}
		</Col>
	);
};

export default SegmentDuration;
