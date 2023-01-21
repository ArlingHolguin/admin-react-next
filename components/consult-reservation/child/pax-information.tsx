import { Row } from "antd";
import { IPassenger } from "../../../models/misReservas.model";

interface Props {
	pax: IPassenger;
	idx: number;
}

const PaxInformation = ({ pax, idx }: Props) => {
	return (
		<Row className="pax-info">
			<h3>
				{idx + 1}. PASAJERO ({pax.pdt.toUpperCase()})
			</h3>
			<div>
				<h4>NOMBRE: {pax.name.toUpperCase()}</h4>
				<h4>DOCUMENTO: {pax.document.toUpperCase()}</h4>
			</div>
		</Row>
	);
};

export default PaxInformation;
