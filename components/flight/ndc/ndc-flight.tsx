import { Button, Col, Row, Modal } from "antd";
import { useState, useEffect } from "react";
import ItemAirline from "../item-airline";
import { ServiceList } from "./service-list";
import FlightDetailView from "../detailView/FlightDetailView";
import { FlightDetailProvider } from "../../../context/flightItem.context";
import ModalTitle from "../detailView/ModalTitle";
import formatter from "../../../lib/priceFormatter";
import { IFlightProps } from "../../../models/flight.model";
import { useSelection } from "../../../context/brandSelection.context";
import { useApp } from "../../../context/app.context";
import Cabin from "../../cabins";
interface Props {
	flightList: IFlightProps[];
	passengers: { adults: string; childs: string; babies: string };
	selectFlight: any;
}

export const NdcFlight: React.FC<Props> = ({
	flightList,
	passengers,
	selectFlight
}) => {
	const {
		selectedBrand,
		selectedFlight,
		saveSelectedFlight,
		saveSelectedBrand
	} = useSelection();
	const defaultFlight = flightList[0];

	const [showModal, setShowModal] = useState(false);
	const [hasExecutiveCabin, setHasExecutiveCabin] = useState(false);
	const [isSelectingBranded, setIsSelectingBranded] = useState(false);
	const [brandedSelected, setBrandedSelected] = useState(null);
	const [exectiveCabins, setExecutiveCabins] = useState(null);

	const { minPrice } = useApp();

	const checkExecutiveCabin = () => {
		flightList.map((flight) => {
			if (flight.brand.includes("XL")) {
				setHasExecutiveCabin(true);
				return;
			}
		});
	};

	const getExecutiveCabins = () => {
		const exCabins = flightList.filter((flight) =>
			flight.brand.includes("XL")
		);
		setExecutiveCabins(exCabins);
	};

	const init = () => {
		checkExecutiveCabin();
		getExecutiveCabins();
		saveSelectedBrand(defaultFlight.brand);
	};
	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		saveSelectedFlight(
			flightList.filter((flight) => flight.brand == selectedBrand)[0]
		);
	}, [selectedBrand]);

	return (
		<Row className="flight-item">
			<Row type="flex" justify="space-between" align="middle">
				<FlightDetailProvider>
					<Modal
						title={<ModalTitle segments={defaultFlight.segments} />}
						visible={showModal}
						onCancel={() => setShowModal(!showModal)}
						onOk={() => setShowModal(!showModal)}
						width={620}
					>
						<FlightDetailView />
					</Modal>
				</FlightDetailProvider>
				<Col md={10} lg={14}>
					<Row type="flex" justify="space-around" align="middle">
						<Col xs={3} md={3} sm={3} lg={3}>
							<p>{defaultFlight.origin.hour}</p>
							<p>{defaultFlight.origin.city}</p>
						</Col>
						<Col lg={4} md={5} sm={0} xs={0}>
							<Row type="flex" justify="center">
								<p style={{ fontSize: 12 }}>
									{defaultFlight.duration_flight}h
								</p>
								<a
									onClick={() => {
										setShowModal(true);
									}}
									style={{ color: "#DF395D" }}
								>
									{defaultFlight.scales > 1
										? `${defaultFlight.scales - 1} escalas`
										: "DIRECTO"}
								</a>
							</Row>
						</Col>
						<Col xs={3} md={3} sm={3} lg={3}>
							<p>{defaultFlight.destine.hour}</p>
							<p>{defaultFlight.destine.city}</p>
						</Col>
						<Col xs={3} md={3} sm={3} lg={5}>
							<Row type="flex" justify="center">
								<img
									style={{ maxWidth: "100%" }}
									src={`/static/aerolineas/${defaultFlight.airline}.png`}
								/>
							</Row>
						</Col>
					</Row>
				</Col>

				<Col md={14} lg={10}>
					{minPrice ? (
						minPrice == Number(defaultFlight.price) && (
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
					<Row type="flex" align="middle">
						<Col style={{ marginRight: 5 }}>
							<Cabin
								loading={false}
								type="economy"
								onClick={() =>
									setIsSelectingBranded(!isSelectingBranded)
								}
								price={defaultFlight.price}
							/>
						</Col>
						{hasExecutiveCabin && (
							<Col>
								<Cabin
									loading={false}
									type="executive"
									onClick={() =>
										setIsSelectingBranded(
											!isSelectingBranded
										)
									}
									price={exectiveCabins[0].price}
								/>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
			{isSelectingBranded &&
				(!brandedSelected ? (
					<Row
						style={{
							marginTop: "16px",
							overflowX: "scroll",
							width: "100%",
							flexFlow: "row nowrap"
						}}
						type="flex"
						gutter={[16, 16]}
					>
						{flightList.map((flight, idx) => (
							<ItemAirline
								key={flight.offer_item_id}
								select={selectedBrand == flight.brand}
								branded={{
									text: flight.brand,
									price: flight.price
								}}
							/>
						))}
					</Row>
				) : (
					<Row className="service-list">
						<ServiceList
							passengers={passengers}
							services={null}
							addPrice={null}
						/>
					</Row>
				))}

			{isSelectingBranded &&
				(!brandedSelected ? (
					<Row
						type="flex"
						justify="end"
						className="reserve"
						align="middle"
					>
						<h2>
							{formatter.format(parseInt(selectedFlight?.price))}{" "}
							COP
						</h2>
						<Button
							size="large"
							type="primary"
							onClick={() =>
								selectFlight(
									selectedFlight,
									"NDC",
									defaultFlight.offer_item_id
								)
							}
						>
							RESERVAR
						</Button>
					</Row>
				) : null)}
		</Row>
	);
};
