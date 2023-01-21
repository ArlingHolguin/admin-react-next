const getPassengersLabel = (passenger) => {
	let label = "";
	const { adults, children, babies } = passenger;

	if (adults > 1) label = `${adults} Adultos`;
	else label = `${adults} Adulto`;

	if (children > 0) {
		if (children > 1) label += `, ${children} Niños`;
		else label += `, ${children} Niño`;
	}
	if (babies > 0) {
		if (babies > 1) label += `, ${babies} Infantes`;
		else label += `, ${babies} Infante`;
	}

	return label;
};

export default getPassengersLabel;
