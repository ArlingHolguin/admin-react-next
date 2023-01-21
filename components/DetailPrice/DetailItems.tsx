import { Row, Col } from "antd";

import getPassengersLabel from "../helpers/getPassengerLabel";
import formatter from "../../lib/priceFormatter";
import { useLocalStorage } from "../../hooks/useLocalstorage";

const DetailItems = ({ totalPrice }) => {
	const [passenger, setPassenger] = useLocalStorage("passenger", {
		adults: 1,
		children: 0,
		babies: 0
	});

	return (
		<>
			<h3>DESGLOSE DE PRECIO</h3>
			<hr className="breakdown"></hr>
			<Row>
				<Row type="flex" justify="space-between">
					<Col>
						<p className="md-em">
							<strong>{getPassengersLabel(passenger)}</strong>
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col>
						<p>Ocupantes</p>
					</Col>
					<Col>
						<p>{formatter.format(totalPrice.net_price)} COP</p>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col>
						<p>Impuestos y tasas</p>
					</Col>
					<Col>
						<p>{formatter.format(totalPrice.taxes)} COP</p>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col>
						<p>Seguros</p>
					</Col>
					<Col>
						<p>{formatter.format(totalPrice.seguros)} COP</p>
					</Col>
				</Row>
				<hr className="breakdown"></hr>
				<Row type="flex" justify="space-around" className="total-price">
					<Col>
						<p>Total</p>
					</Col>
					<Col>
						<p>{formatter.format(totalPrice.total)} COP</p>
					</Col>
				</Row>
			</Row>
		</>
	);
};

export default DetailItems;
