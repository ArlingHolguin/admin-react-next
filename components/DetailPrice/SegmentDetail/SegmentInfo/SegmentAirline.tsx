const SegmentAirline = ({ reservation }) => {
	return (
		<>
			{reservation.segments.length === 1 && (
				<img
					width="90px"
					src={`/static/aerolineas/${reservation.airline}.png`}
				/>
			)}
		</>
	);
};

export default SegmentAirline;
