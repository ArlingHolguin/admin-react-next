import { Checkbox } from "antd";
import { useFlightFilter } from "../../../context/flightFilter.context";
import air_codes from "../../../public/static/data/aerolineas.json";

const AirlineFilters = () => {
	const { flights } = useFlightFilter();
	const airlinesCodes = Object.keys(flights?.summary.airline);

	const CheckboxStyle = {
		display: "block",
		height: "30px",
		lineHeight: "30px"
	};

	return (
		<>
			<Checkbox
				style={{ ...CheckboxStyle, marginLeft: "8px" }}
				value={"ALL"}
				disabled={true}
			>
				Todas ({airlinesCodes.length})
			</Checkbox>
			{airlinesCodes.map((airline, idx) => (
				<Checkbox key={idx} style={CheckboxStyle} value={airline}>
					{air_codes[airline]["name"]}
				</Checkbox>
			))}
		</>
	);
};

export default AirlineFilters;
