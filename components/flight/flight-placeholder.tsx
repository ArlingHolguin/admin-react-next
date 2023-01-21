const FlightsPlaceHolder = () => (
	<>
		{[1, 2, 3, 4, 5].map((value, index, array) => (
			<div key={index} className="flights__placeholder">
				<div></div>
				<div></div>
			</div>
		))}
	</>
);

export default FlightsPlaceHolder;
