const FiltersPlaceHolder = () => (
	<>
		{[1, 2].map((_value, index, _array) => (
			<div key={index} className="filters__placeholder">
				<div></div>
				<div></div>
			</div>
		))}
	</>
);

export default FiltersPlaceHolder;
