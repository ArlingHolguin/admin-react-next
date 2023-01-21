import { Col, Collapse, Row, Tabs, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { ServiceModel } from "../../../models/service.model";
import "../../../assets/components/flight/ndc-mobile-flight.less";
import ItemAirline from "../item-airline";
import formatter from "../../../lib/priceFormatter";
import { useSelection } from "../../../context/brandSelection.context";
import Service from "../../../services";
import { useApp } from "../../../context/app.context";
const { Panel } = Collapse;

import Cabin from "../../cabins";
import { FlightDetailProvider } from "../../../context/flightItem.context";
import ModalTitle from "../detailView/ModalTitle";
import FlightDetailView from "../detailView/FlightDetailView";

const service = new Service();

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

export const AmadeusMobileFlight = ({
	flight,
	flightReturn = null,
	passengers,
	selectFlight,
	rtInternational = null
}) => {
	const [isSelectingBranded, setIsSelectingBranded] = useState(false);
	const {
		selectedBrand,
		selectedFlight,
		saveSelectedFlight,
		saveSelectedBrand
	} = useSelection();

	const {
		minPrice,
		selectedFlightReturn,
		saveSelectedFlightOrg,
		saveSelectedFlightReturn
	} = useApp();

	const [showModal, setShowModal] = useState(false);
	const [hasExecutiveCabin, setHasExecutiveCabin] = useState(false);
	const [exectiveCabins, setExecutiveCabins] = useState(null);
	const [brands, setBrands] = useState(null);
	const [brandsReturn, setBrandsReturn] = useState(null);
	const [hasBrand, setHasBrand] = useState(false);
	const [loadingBranders, setLoadingBranders] = useState(false);

	const checkExecutiveCabin = () => {
		brands.map((b) => {
			if (b.cabin == "C") {
				setHasExecutiveCabin(true);
				return;
			}
		});
	};

	const getExecutiveCabins = () => {
		const exCabin = brands.filter((b) => b.cabin == "C")[0];
		setExecutiveCabins(exCabin);
	};

	const handleNoBrands = () => {
		const dummyFlight = {
			brandPrice: null,
			brandId: null
		};
		setHasBrand(false);
		setIsSelectingBranded(!isSelectingBranded);
		saveSelectedFlight({ ...flight, ...dummyFlight });
		saveSelectedFlightOrg({ ...flight, ...dummyFlight }),
		saveSelectedFlightReturn({ ...flightReturn, ...dummyFlight });
	};

	const handleExpand = () => {
		if (!isSelectingBranded) {
			setLoadingBranders(true)
			if (rtInternational) {
				if (flight.airline == flightReturn.airline) {
					service
						.AmadeusBrands(
							flight.offer_id,
							flight.offer_item_id,
							flightReturn.offer_item_id
						)
						.then((res) => {
							setLoadingBranders(false)
							// status code 200
							if (res !== false) {
								setHasBrand(true);
								setBrands(res.results[0][0].branded);
								setBrandsReturn(res.results[0][1].branded);
								setIsSelectingBranded(!isSelectingBranded);
							}

							// status code 404 or 500
							if (res == false) {
								handleNoBrands();
							}
						});
				} else {
					setLoadingBranders(false)
					handleNoBrands();
				}
			} else {
				service
					.AmadeusBrands(flight.offer_id, flight.offer_item_id)
					.then((res) => {
						setLoadingBranders(false)
						// status code 200
						if (res !== false) {
							setHasBrand(true);
							setBrands(res.results[0][0].branded);
							setIsSelectingBranded(!isSelectingBranded);
						}

						// status code 404 or 500
						if (res == false) {
							setHasBrand(false);
							setIsSelectingBranded(!isSelectingBranded);
							saveSelectedFlight({
								...flight,
								brandPrice: null,
								brandId: null
							});
						}
					});
			}
		} else {
			setIsSelectingBranded(false);
		}
	};

	useEffect(() => {
		if (brands) {
			saveSelectedBrand(brands[0].name);
			checkExecutiveCabin();
			getExecutiveCabins();
			saveSelectedFlight({
				...flight,
				brandPrice: brands[0].fullPrice,
				brandId: brands[0].id
			});
		}
	}, [brands]);

	useEffect(() => {
		if (brands) {
			const br = brands.filter((b) => b.name == selectedBrand)[0];
			const dummyFlight = {
				brandPrice: br.fullPrice,
				brandId: br.id
			};
			saveSelectedBrand(br.name);
			saveSelectedFlight({ ...flight, ...dummyFlight });
			saveSelectedFlightOrg({ ...flight, ...dummyFlight });
			if(rtInternational){
				const brReturn = brandsReturn.filter((b) => b.name == selectedBrand)[0]
				const flightBrandReturn = {
					brandPrice: brReturn.fullPrice,
					brandId: brReturn.id
				};
				saveSelectedFlightReturn({ ...flightReturn, ...flightBrandReturn });
			}
		}

	}, [selectedBrand]);
	const flights = flightReturn ? [flight, flightReturn] : [flight];
	return (
		<Row className="flight-item">
			<FlightDetailProvider>
				<Modal
					title={<ModalTitle segments={flight.segments} />}
					visible={showModal}
					onCancel={() => setShowModal(!showModal)}
					onOk={() => setShowModal(!showModal)}
					width={620}
				>
					<FlightDetailView />
				</Modal>
			</FlightDetailProvider>
			<Row style={{height: "100%"}}>
				<Col xs={24} sm={rtInternational ? 9 : 24}>
					{flights.map((fl, idx) => {
						return (
							<>
								<Row
									type="flex"
									align="middle"
									style={{
										paddingBottom: "12px",
										paddingLeft: "5px"
									}}
								>
									<Col xs={8} sm={16}>
										<img
											style={{ width: "100%", maxWidth: "100px" }}
											src={`/static/aerolineas/${fl.airline}.png`}
										/>
									</Col>
									{!rtInternational && (
										<Col xs={16} sm={8}>
											{minPrice ? (
												minPrice == Number(flight.price) && (
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
									)}
								</Row>
								<Row type="flex" justify="space-between" align="middle">
									<Col xs={24} sm={ rtInternational ? 24 : 9}>
										<Row
											type="flex"
											justify="space-between"
											align="middle"
										>
											<Col xs={6}>
												<Row type="flex" justify="center">
													<p>{fl.origin.hour}</p>
												</Row>
												<Row type="flex" justify="center">
													<p>{fl.origin.city}</p>
												</Row>
											</Col>
											<Col xs={10}>
												<Row type="flex" justify="center">
													<p>{fl.duration_flight}h</p>
												</Row>
												<Row type="flex" justify="center">
													<a
														onClick={() => {
															setShowModal(true);
														}}
														style={{ color: "#DF395D" }}
													>
														{fl.scales > 1
															? `${
																	fl.scales - 1
																} escala(s)`
															: "DIRECTO"}
													</a>
												</Row>
											</Col>
											<Col xs={6}>
												<Row type="flex" justify="center">
													<p>{fl.destine.hour}</p>
												</Row>
												<Row type="flex" justify="center">
													<p>{fl.destine.city}</p>
												</Row>
											</Col>
										</Row>
									</Col>
									{!rtInternational && (
										<Col xs={0} sm={14}>
											<Row type="flex">
												<Col style={{ marginRight: 5 }}>
													<Cabin
														loading={loadingBranders}
														onClick={handleExpand}
														type="economy"
														price={flight.price}
													/>
												</Col>
												<Col>
													{hasExecutiveCabin && (
														<Cabin
															loading={loadingBranders}
															onClick={handleExpand}
															type="executive"
															price={exectiveCabins.fullPrice}
														/>
													)}
												</Col>
											</Row>
										</Col>
									)}
								</Row>
								{idx == 0 && flightReturn && (
									<Row className="horizontalSeparator"></Row>
								)}
							</>
						);
					})}
				</Col>
				{rtInternational && (
					<Col xs={0} sm={14}>
						<Row style={{height: "100%", display: "flex", flexDirection: "column"}}>
							<Row>
								{minPrice ? (
									minPrice == Number(flight.price) && (
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
							</Row>
							<Row type="flex" align="middle" style={minPrice ? minPrice == Number(flight.price) ? {paddingLeft: "15px", paddingTop: "10%"} : {paddingLeft: "15px",  paddingTop: "20%"} : {paddingLeft: "15px",  paddingTop: "10%"}}>
								<Col style={{ marginRight: 5 }}>
									<Cabin
										loading={loadingBranders}
										onClick={handleExpand}
										type="economy"
										price={flight.price}
									/>
								</Col>
								<Col>
									{hasExecutiveCabin && (
										<Cabin
											loading={loadingBranders}
											onClick={handleExpand}
											type="executive"
											price={exectiveCabins.fullPrice}
										/>
									)}
								</Col>
							</Row>
						</Row>
					</Col>
				)}
			</Row>
			<Row className="flight-mobile" style={{ marginTop: "5px" }}>
				<Row
					type="flex"
					justify="space-between"
					style={{ width: "100%" }}
				>
					<Col xs={12} sm={0} md={0}>
						<Cabin
							loading={loadingBranders}
							onClick={handleExpand}
							type="economy"
							price={flight.price}
							styles={{ width: "99%", marginRight: "5px" }}
						/>
					</Col>
					<Col xs={12} sm={0} md={0}>
						{hasExecutiveCabin && (
							<Cabin
								loading={loadingBranders}
								onClick={handleExpand}
								type="executive"
								price={exectiveCabins.fullPrice}
								styles={{ width: "99%" }}
							/>
						)}
					</Col>
				</Row>
				{isSelectingBranded && hasBrand ? (
					<>
						<Collapse
							accordion
							className="informative-flight"
							style={{ zIndex: 1, marginTop: 5 }}
							onChange={(value) => {
								if (value) {
									saveSelectedBrand(value);
								}
							}}
						>
							{brands.map((brand, idx) => {
								const select = selectedBrand == brand.name;
								const brandText = brand.name.split("-")[0];
								return (
									<Panel
										header={
											<div className="header-informative">
												<div className="circle"></div>
												<p>
													{formatter.format(
														brand.fullPrice
													)}{" "}
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
											key={brand.offer_item_id}
											branded={{
												text: brand.name,
												price: brand.fullPrice
											}}
											mobile
											flightServices={brand.services}
										/>
									</Panel>
								);
							})}
						</Collapse>
						<Row
							type="flex"
							justify="end"
							className="reserve"
							align="middle"
						>
							<h2>
								{formatter.format(
									parseInt(selectedFlight?.brandPrice)
								)}{" "}
								COP
							</h2>
							<Button
								size="large"
								type="primary"
								onClick={() =>
									selectFlight(
										selectedFlight,
										"AMADEUS",
										"",
										selectedFlightReturn
									)
								}
							>
								RESERVAR
							</Button>
						</Row>
					</>
				) : null}
				{isSelectingBranded && !hasBrand ? (
					<>
						<Row
							type="flex"
							justify="end"
							className="reserve"
							align="middle"
						>
							<h2>
								{formatter.format(parseInt(flight?.price))} COP
							</h2>
							<Button
								size="large"
								type="primary"
								onClick={() =>
									selectFlight(
										selectedFlight,
										"AMADEUS",
										"",
										selectedFlightReturn
									)
								}
							>
								RESERVAR
							</Button>
						</Row>
					</>
				) : null}
			</Row>
		</Row>
	);
};
