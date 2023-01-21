import { Row, Col, Icon, Button, Tag } from "antd";
import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import formatter from "../../lib/priceFormatter";
import Notification from "../../lib/customNotifications";

const Ticket = () => {
	const notification = new Notification();
	const [reservationInfo, setReservationInfo] = useLocalStorage(
		"reservation",
		null
	);

	useEffect(() => {
		if (reservationInfo == null) {
			notification.Error(
				"Ocurrió un error",
				"No se encontraron datos de la reserva"
			);
		}
	}, [reservationInfo]);

	if (!reservationInfo) return null;

	return (
		<Row>
			<Row id="thanks-head" type="flex" justify="space-between">
				<h1>
					<Icon
						style={{ color: "green" }}
						type="check-circle"
						theme="filled"
					/>
					¡FELICIDADES! tu reserva está confirmada
				</h1>
				<h1>
					<span>Reserva: </span>
					{reservationInfo?.map((reserve, index) => (
						<Tag key={index} color="green">
							{reserve.details.code_reserved}
						</Tag>
					))}
				</h1>
			</Row>
			<Row id="thanks-buy-info">
				<p>
					Recuerda hacer tu{" "}
					<Button id="thanks-checkin" type="link">
						web check-in
					</Button>{" "}
					antes del vuelo
				</p>
				<h1>Datos de tu compra:</h1>
				<Row type="flex" justify="space-between">
					<Col className="thanks-passenger">
						<h3>Pasajero(s):</h3>
						{Array.isArray(reservationInfo[0].passengers)
							? reservationInfo[0].passengers.map(
									(pax: any) =>
										pax?.name + " " + pax?.last_name
							  )
							: reservationInfo[0].passengers.name +
							  " " +
							  reservationInfo[0].passengers.last_name}
					</Col>
					<Col className="thanks-passenger">
						<h3>Documento de identidad:</h3>
						{Array.isArray(reservationInfo[0].passengers)
							? reservationInfo[0].passengers.map(
									(pax: any) => pax?.document
							  )
							: reservationInfo[0].passengers.document}
					</Col>
					<Col className="thanks-passenger">
						<h3>Valor:</h3>
						{formatter.format(reservationInfo[0].details.price)} COP
					</Col>
				</Row>
			</Row>
		</Row>
	);
};

export default Ticket;
