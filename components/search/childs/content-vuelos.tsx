import { Row, Button, Radio } from "antd";
import RoundTrip from "../../forms/round_trip";
import { useState } from "react";
import MultiDestination from "../../forms/multi_destination";
import "./content-vuelos.less";

const ContentVuelos = (props) => {
	const [typeFligth, setTypeFligth] = useState("round_trip");

	/**
	 * manejo de radio tipo de viaje
	 */

	const onChangeTypeFligth = (value) => {
		setTypeFligth(value.target.value);
	};
	return (
		<div>
			<Row style={{ marginBottom: 16 }}>
				<Row>
					<h1 className="seo-h1">VUELOS BARATOS CON TIQUETESYTIQUETES</h1>
				</Row>
				<Radio.Group
					name="fligth"
					onChange={onChangeTypeFligth}
					defaultValue={typeFligth}
					value={typeFligth}
				>
					<Radio.Button value="round_trip">Ida y vuelta</Radio.Button>
					<Radio.Button value="trip">Solo ida</Radio.Button>
					{/* <Radio.Button value="multi_destination">Multidestino</Radio.Button> */}
				</Radio.Group>
			</Row>
			<Row>
				{typeFligth === "multi_destination" ? (
					<MultiDestination data={props.data} />
				) : (
					<RoundTrip
						setTypeFligth={setTypeFligth}
						data={props.data}
						fligth={typeFligth}
					></RoundTrip>
				)}
			</Row>
		</div>
	);
};
export default ContentVuelos;
