import { Col, Collapse, Row, Tabs, Button } from "antd";
import { useEffect, useState } from "react";
import { ServiceModel } from "../../../models/service.model";
import "../../../assets/components/flight/ndc-mobile-flight.less";
import ItemAirline from "../item-airline";
import formatter from "../../../lib/priceFormatter";
import { useSelection } from "../../../context/brandSelection.context";
import { useApp } from "../../../context/app.context";
const { Panel } = Collapse;
const { TabPane } = Tabs;

import Cabin from "../../cabins";
import { FlightDetailProvider } from "../../../context/flightItem.context";
import ModalTitle from "../detailView/ModalTitle";
import FlightDetailView from "../detailView/FlightDetailView";

const incluteRate: ServiceModel[] = [
	{
		text: "Equipaje de mano 1x10kg/22lbs",
		icon: "luggage_hand.png"
	}
];
const additionalCost: ServiceModel[] = [
	{
		text: "asdfg",
		icon: "luggage_hand.png",
		price: 20000
	}
];

/**
 * elements for
 */

const IncludeRateComponent = incluteRate.map((item) => (
	<div className="item">
		<img src={"/static/img/item_airline/" + item.icon} />
		<p>{item.text}</p>
	</div>
));

const AditionalCostComponent = additionalCost.map((item) => (
	<div className="item">
		<img src={"/static/img/item_airline/" + item.icon} />
		<div className="item-text">
			<p>
				{item.text}. Desde {item.price}
			</p>
		</div>
	</div>
));

export const NdcMobileFlight = ({ flightList, passengers, selectFlight }) => {
	const [showSelectBrand, setShowSelectBrand] = useState(false);
	const defaultFlight = flightList[0];
	const {
		selectedBrand,
		selectedFlight,
		saveSelectedFlight,
		saveSelectedBrand
	} = useSelection();
	const [hasExecutiveCabin, setHasExecutiveCabin] = useState(false);
	const [exectiveCabins, setExecutiveCabins] = useState(null);

	const { minPrice } = useApp();

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

	return (
		<Row className="flight-item">
			<Row
				type="flex"
				align="middle"
				style={{ paddingBottom: "12px", paddingLeft: "5px" }}
			>
				<Col xs={8} sm={16}>
					<img
						style={{ width: "100%", maxWidth: "100px" }}
						src={`/static/aerolineas/${defaultFlight.airline}.png`}
					/>
				</Col>
				<Col xs={16} sm={8}>
					{minPrice ? (
						minPrice == Number(defaultFlight.price) && (
							<Row
								type="flex"
								align="middle"
								justify="end"
								className="best-rate"
							>
								<img src="/static/img/medalla.png" />
								<p>MEJOR TARIFA</p>
							</Row>
						)
					) : (
						<></>
					)}
				</Col>
			</Row>
			<Row type="flex" justify="space-between" align="middle">
				<Col xs={24} sm={9}>
					<Row type="flex" justify="space-between" align="middle">
						<Col xs={6}>
							<Row type="flex" justify="center">
								<p>{defaultFlight.origin.hour}</p>
							</Row>
							<Row type="flex" justify="center">
								<p>{defaultFlight.origin.city}</p>
							</Row>
						</Col>
						<Col xs={10}>
							<Row type="flex" justify="center">
								<p>{defaultFlight.duration_flight}h</p>
							</Row>
							<Row type="flex" justify="center">
								<a>
									{defaultFlight.scales > 1
										? `${
												defaultFlight.scales - 1
										  } escala(s)`
										: "DIRECTO"}
								</a>
							</Row>
						</Col>
						<Col xs={6}>
							<Row type="flex" justify="center">
								<p>{defaultFlight.destine.hour}</p>
							</Row>
							<Row type="flex" justify="center">
								<p>{defaultFlight.destine.city}</p>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col xs={0} sm={14}>
					<Row type="flex">
						<Col style={{ marginRight: 5 }}>
							<Cabin
								loading={false}
								onClick={() =>
									setShowSelectBrand(!showSelectBrand)
								}
								type="economy"
								price={defaultFlight.price}
							/>
						</Col>
						<Col>
							{hasExecutiveCabin && (
								<Cabin
									loading={false}
									onClick={() =>
										setShowSelectBrand(!showSelectBrand)
									}
									type="executive"
									price={exectiveCabins[0].price}
								/>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="flight-mobile" style={{ marginTop: "5px" }}>
				<Row
					type="flex"
					justify="space-between"
					style={{ width: "100%" }}
				>
					<Col xs={12} sm={0} md={0}>
						<Cabin
							loading={false}
							onClick={() => setShowSelectBrand(!showSelectBrand)}
							type="economy"
							price={defaultFlight.price}
							styles={{ width: "99%", marginRight: "5px" }}
						/>
					</Col>
					<Col xs={12} sm={0} md={0}>
						{hasExecutiveCabin && (
							<Cabin
								loading={false}
								onClick={() =>
									setShowSelectBrand(!showSelectBrand)
								}
								type="executive"
								price={exectiveCabins[0].price}
								styles={{ width: "99%" }}
							/>
						)}
					</Col>
				</Row>
				{showSelectBrand && (
					<Collapse
						accordion
						className="informative-flight"
						style={{ zIndex: 1 }}
						onChange={(value) => {
							if (value) {
								saveSelectedBrand(value);
							}
						}}
					>
						{flightList.map((flight, idx) => {
							const select = selectedBrand == flight.brand;
							const brandText = flight.brand.split("-")[0];
							return (
								<Panel
									header={
										<div className="header-informative">
											<div className="circle"></div>
											<p>
												{formatter.format(flight.price)}{" "}
												COP
											</p>
											<p>{brandText}</p>
										</div>
									}
									showArrow={false}
									className={select && "selected"}
									key={brandText}
								>
									<ItemAirline
										key={flight.offer_item_id}
										branded={{
											text: flight.brand,
											price: flight.price
										}}
										mobile
									/>
								</Panel>
							);
						})}
					</Collapse>
				)}
				{showSelectBrand && (
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
				)}
			</Row>
		</Row>
	);
};
