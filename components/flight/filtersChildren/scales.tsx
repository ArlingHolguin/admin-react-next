import { Checkbox } from "antd";
import { useFlightFilter } from "../../../context/flightFilter.context";

const ScalesFilters = () => {
	const { flights } = useFlightFilter();
	const segments = Object.keys(flights?.summary.segments);

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
				Todas las escalas {`(${flights?.summary.total_flights})`}
			</Checkbox>
			{segments.map((seg, idx) => (
				<Checkbox
					key={idx}
					style={CheckboxStyle}
					value={Number(segments[idx])}
				>
					{seg == "1" ? "Directo" : Number(seg) - 1 + " Escalas"}{" "}
					{`(${flights?.summary.segments[seg]})`}
				</Checkbox>
			))}
		</>
	);
};

export default ScalesFilters;
