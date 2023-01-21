import { Row, Col, Button, Modal, Popover } from "antd";
import "../../assets/components/flight/flight-item.less";
import useWindowDimensions from "../../hooks/useWindowsDimension";
import { IFlightProps } from "../../models/flight.model";
import { NdcFlight } from "./ndc/ndc-flight";
import { NdcMobileFlight } from "./ndc/ndc-mobile-flight";
import { AmadeusMobileFlight } from "./amadeus/amadeus-mobile-flight";
import { useState, useEffect } from "react";
import ModalTitle from "./detailView/ModalTitle";
import FlightDetailView from "./detailView/FlightDetailView";
import { FlightDetailProvider } from "../../context/flightItem.context";
import formatter from "../../lib/priceFormatter";
import { SelectionProvider } from "../../context/brandSelection.context";
import { AmadeusFlight } from "./amadeus/amadeus-flight";
import { AmadeusFlightInter } from "./amadeus/amadeus-flight-inter";
import { IFlight } from "../../models/flight.model";
import FlightsPlaceHolder from "./flight-placeholder";
import { useApp } from "../../context/app.context";

const content = (
	<div>
		<p>Equipaje de mano 1 x 10 </p>
		<p>y 1 articulo personal</p>
	</div>
);

export const FlightItemNormal = ({ flight, selectFlight }) => {
	const [showModal, setShowModal] = useState(false);
	const flightLocal: IFlightProps = flight;
	const { height, width } = useWindowDimensions();
	const { minPrice } = useApp();

	const price = formatter.format(Number(flight.price)) + " COP";
	return (
		<Row
			type="flex"
			justify="space-between"
			align="middle"
			className="flight-item"
		>
			<FlightDetailProvider>
				<Modal
					title={<ModalTitle segments={flightLocal.segments} />}
					visible={showModal}
					onCancel={() => setShowModal(!showModal)}
					onOk={() => setShowModal(!showModal)}
					width={620}
				>
					<FlightDetailView />
				</Modal>
			</FlightDetailProvider>
			{width < 770 && (
				<a
					style={{ position: "absolute", inset: "0", zIndex: 1 }}
					onClick={() => setShowModal(!showModal)}
				></a>
			)}
			<Col xs={0} md={3} sm={3} lg={3}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<p>{flightLocal.origin.hour}</p>
					<p>{flightLocal.origin.city}</p>
				</div>
			</Col>
			<Col lg={3} md={3} sm={0} xs={0}>
				<Row type="flex" justify="center">
					<p>{flightLocal.duration_flight}h</p>
					<a
						onClick={() => setShowModal(!showModal)}
						style={{ color: "#DF395D" }}
					>
						{flightLocal.scales > 1
							? `${flightLocal.scales - 1} escalas`
							: "DIRECTO"}
					</a>
				</Row>
			</Col>
			<Col xs={0} md={3} sm={3} lg={3}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<p>{flightLocal.destine.hour}</p>
					<p>{flightLocal.destine.city}</p>
				</div>
			</Col>
			<Col xs={0} sm={6} lg={6} md={6}>
				<img
					style={{ maxWidth: "85%" }}
					src={`/static/aerolineas/${flightLocal.airline}.png`}
				/>
			</Col>
			<Col xs={0} sm={2} lg={2} md={2}>
				<Popover
					placement="topLeft"
					content={content}
					title="Esta tarifa incluye"
				>
					<img className="putOver" src="/static/img/maleta.png" />
				</Popover>
			</Col>
			<Col xs={0} sm={6} lg={6} md={6}>
				<Row type="flex" justify="end" className="reserve-normal">
					{minPrice ? (
						minPrice == Number(flightLocal.price) && (
							<Row
								type="flex"
								align="middle"
								className="best-rate"
							>
								<img src="/static/img/medalla.png" />
								<p>MEJOR TARIFA</p>
							</Row>
						)
					) : (
						<></>
					)}
					<p className="price">{price}</p>
					<Button
						className="putOver"
						type="primary"
						onClick={(event) => selectFlight(flightLocal)}
					>
						RESERVAR
					</Button>
				</Row>
			</Col>
			{width <= 400 ? (
				<Col xs={12} sm={0} lg={0} md={0}>
					<Row type="flex" className="reserve-normal">
						<Row type="flex" justify="space-between">
							<Row>
								<p>{flightLocal.origin.hour}</p>
								<p>{flightLocal.origin.city}</p>
							</Row>
							<Row>
								<p>{flightLocal.destine.hour}</p>
								<p>{flightLocal.destine.city}</p>
							</Row>
						</Row>
						<Row>
							<Row>
								<p className="price">DESDE</p>
								<p className="price">${flightLocal.price}</p>
							</Row>
						</Row>
					</Row>
				</Col>
			) : (
				<>
					<Col xs={3} sm={0} lg={0} md={0}>
						<p>{flightLocal.origin.hour}</p>
						<p>{flightLocal.origin.city}</p>
					</Col>
					<Col xs={3} sm={0} lg={0} md={0}>
						<p>{flightLocal.destine.hour}</p>
						<p>{flightLocal.destine.city}</p>
					</Col>
					<Col xs={7} sm={0} lg={0} md={0}>
						<p className="price">DESDE</p>
						<p className="price">${flightLocal.price}</p>
					</Col>
				</>
			)}
			<Col xs={9} sm={0} lg={0} md={0}>
				<Row
					type="flex"
					justify="end"
					align="middle"
					className="reserve-normal"
				>
					<p className="price">
						{flightLocal.scales > 1
							? `${flightLocal.scales - 1} escalas`
							: "DIRECTO"}
					</p>
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{ paddingBottom: "10px" }}
					>
						<Popover
							placement="topLeft"
							content={content}
							title="Esta tarifa incluye"
						>
							<img
								className="putOver"
								width="20px"
								height="20px"
								src="/static/img/maleta.png"
							/>
						</Popover>
						<img
							style={{ maxWidth: "65%" }}
							src={`/static/aerolineas/${flightLocal.airline}.png`}
						/>
					</Row>
					<Button
						className="putOver"
						type="primary"
						onClick={(event) => selectFlight(flightLocal)}
					>
						RESERVAR
					</Button>
				</Row>
			</Col>
		</Row>
	);
};

interface Props {
	flightsNDC?: IFlightProps[][];
	flightsAmadeus?: IFlightProps[];
	passengers: { adults: string; childs: string; babies: string };
	selectFlight: any;
	flightsReturn?: IFlight;
	rtInternational?: boolean;
}

export const FlightItemNDC: React.FC<Props> = ({
	flightsNDC,
	passengers,
	selectFlight
}) => {
	if (typeof window !== "undefined") {
		const { height, width } = useWindowDimensions();
		return (
			<div>
				{width > 995
					? flightsNDC.map((recomm) => (
							<SelectionProvider key={recomm[0].offer_item_id}>
								<NdcFlight
									flightList={recomm}
									passengers={passengers}
									selectFlight={selectFlight}
								/>
							</SelectionProvider>
					  ))
					: flightsNDC.map((recomm) => (
							<SelectionProvider>
								<NdcMobileFlight
									key={recomm[0].offer_item_id.toString()}
									flightList={recomm}
									passengers={passengers}
									selectFlight={selectFlight}
								/>
							</SelectionProvider>
					  ))}
			</div>
		);
	}
};

const parseGroupFlights = (flightsGo, flightsReturn) => {
	let pairs = [];
	flightsGo.forEach((fg) => {
		const pairDigitGo = fg.offer_item_id.split("-").slice(-1)[0];
		const pairsFlights = flightsReturn.filter((fr) => {
			const pairDigitReturn = fr.offer_item_id.split("-").slice(-1)[0];
			return (
				fr.offer_id === fg.offer_id && pairDigitGo === pairDigitReturn
			);
		});
		pairsFlights.forEach((fr) => {
			pairs.push({
				flight: fg,
				flightReturn: fr
			});
		});
	});
	return pairs;
};

export const FlightItemAmadeus: React.FC<Props> = ({
	flightsAmadeus,
	passengers,
	selectFlight,
	flightsReturn,
	rtInternational
}) => {
	const [flightsInterGroup, setFlightInterGroup] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		if (rtInternational && flightsReturn) {
			setTimeout(() => {
				const tempFlightsInterGroup = parseGroupFlights(
					flightsAmadeus,
					flightsReturn.Amadeus
				);
				setFlightInterGroup(tempFlightsInterGroup);
				setIsLoading(false);
			}, 1000);
		} else {
			setIsLoading(false);
		}
	}, [flightsAmadeus]);

	if (typeof window !== "undefined") {
		const { height, width } = useWindowDimensions();
		return (
			<>
				{isLoading ? (
					<div className="placeholder-wrapper">
						<FlightsPlaceHolder />
					</div>
				) : (
					<div>
						{width > 995
							? rtInternational && flightsInterGroup
								? flightsInterGroup.map((recommGroup, idx) => (
										<SelectionProvider
											key={
												recommGroup.flight
													.offer_item_id +
												"-" +
												idx
											}
										>
											<AmadeusFlightInter
												flight={recommGroup.flight}
												flightReturn={
													recommGroup.flightReturn
												}
												passengers={passengers}
												selectFlight={selectFlight}
											/>
										</SelectionProvider>
								  ))
								: flightsAmadeus.map((recomm, idx) => (
										<SelectionProvider
											key={
												recomm.offer_item_id + "-" + idx
											}
										>
											<AmadeusFlight
												flight={recomm}
												passengers={passengers}
												selectFlight={selectFlight}
											/>
										</SelectionProvider>
								  ))
							: rtInternational && flightsInterGroup
							? flightsInterGroup.map((recommGroup, idx) => (
									<SelectionProvider
										key={
											recommGroup.flight.offer_item_id +
											"-" +
											idx
										}
									>
										<AmadeusMobileFlight
											flight={recommGroup.flight}
											flightReturn={
												recommGroup.flightReturn
											}
											passengers={passengers}
											selectFlight={selectFlight}
											rtInternational={rtInternational}
										/>
									</SelectionProvider>
							  ))
							: flightsAmadeus.map((recomm, idx) => (
									<SelectionProvider
										key={recomm.offer_item_id + "-" + idx}
									>
										<AmadeusMobileFlight
											flight={recomm}
											passengers={passengers}
											selectFlight={selectFlight}
										/>
									</SelectionProvider>
							  ))}
					</div>
				)}
			</>
		);
	}
};
