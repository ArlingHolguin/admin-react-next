const SegmentAirport = ({ airportCode, cityName = null }) => {
	return (
		<div className="airport">
			<p>Aeropuerto</p>
			<p><strong>{airportCode}</strong></p>
			{cityName && <p>{cityName}</p> }
		</div>
	);
};

export default SegmentAirport;
