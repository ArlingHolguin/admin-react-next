import { Button, Col, Row, Modal } from "antd";
import { useState, useEffect } from "react";
import ItemAirline from "../item-airline";
import FlightDetailView from "../detailView/FlightDetailView";
import { FlightDetailProvider } from "../../../context/flightItem.context";
import ModalTitle from "../detailView/ModalTitle";
import formatter from "../../../lib/priceFormatter";
import { IFlightProps } from "../../../models/flight.model";
import { useSelection } from "../../../context/brandSelection.context";
import Service from "../../../services";
import { useApp } from "../../../context/app.context";

import Cabin from "../../cabins";

interface Props {
	flight: IFlightProps;
	passengers: { adults: string; childs: string; babies: string };
	selectFlight: any;
}

const service = new Service();

export const AmadeusFlight: React.FC<Props> = ({
	flight,
	passengers,
	selectFlight
}) => {
	const {
		selectedBrand,
		selectedFlight,
		saveSelectedFlight,
		saveSelectedBrand
	} = useSelection();

	const { minPrice } = useApp();

	const [showModal, setShowModal] = useState(false);
	const [hasExecutiveCabin, setHasExecutiveCabin] = useState(false);
	const [isSelectingBranded, setIsSelectingBranded] = useState(false);
	const [brandedSelected, setBrandedSelected] = useState(null);
	const [exectiveCabins, setExecutiveCabins] = useState(null);
	const [brands, setBrands] = useState(null);
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

	const handleExpand = () => {
		if (!isSelectingBranded) {
			setLoadingBranders(true)
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
			saveSelectedBrand(br.name);
			saveSelectedFlight({
				...flight,
				brandPrice: br.fullPrice,
				brandId: br.id
			});
		}
	}, [selectedBrand]);

	return (
		<Row className="flight-item">
			<Row type="flex" justify="space-between" align="middle">
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
				<Col md={10} lg={14}>
					<Row type="flex" justify="space-around" align="middle">
						<Col xs={3} md={3} sm={3} lg={3}>
							<p>{flight.origin.hour}</p>
							<p>{flight.origin.city}</p>
						</Col>
						<Col xs={0} md={5} sm={0} lg={4}>
							<Row type="flex" justify="center">
								<p style={{ fontSize: 12 }}>
									{flight.duration_flight}h
								</p>
								<a
									onClick={() => {
										setShowModal(true);
									}}
									style={{ color: "#DF395D" }}
								>
									{flight.scales > 1
										? `${flight.scales - 1} escala(s)`
										: "DIRECTO"}
								</a>
							</Row>
						</Col>
						<Col xs={3} md={3} sm={3} lg={3}>
							<p>{flight.destine.hour}</p>
							<p>{flight.destine.city}</p>
						</Col>
						<Col xs={3} md={3} sm={3} lg={5}>
							<Row type="flex" justify="center">
								<img
									style={{ maxWidth: "100%" }}
									src={`/static/aerolineas/${flight.airline}.png`}
								/>
							</Row>
						</Col>
					</Row>
				</Col>

				<Col md={14} lg={10}>
					{minPrice ? (
						minPrice == Number(flight.price) && (
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
								loading={loadingBranders}
								type="economy"
								onClick={handleExpand}
								price={flight.price}
							/>
						</Col>
						{hasExecutiveCabin && (
							<Col>
								<Cabin
									loading={loadingBranders}
									type="executive"
									onClick={handleExpand}
									price={exectiveCabins.fullPrice}
								/>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
			{isSelectingBranded &&
				(!brandedSelected && hasBrand ? (
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
						{brands.map((brand) => (
							<ItemAirline
								key={brand.id}
								select={selectedBrand == brand.name}
								branded={{
									text: brand.name,
									price: brand.fullPrice
								}}
								flightServices={brand.services}
							/>
						))}
					</Row>
				) : (
					<Row className="service-list">
						{/* <ServiceList passengers={passengers} services={null} addPrice={null} /> */}
					</Row>
				))}

			{isSelectingBranded &&
				(!brandedSelected && hasBrand ? (
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
								selectFlight(selectedFlight, "AMADEUS")
							}
						>
							RESERVAR
						</Button>
					</Row>
				) : null)}

			{isSelectingBranded && !hasBrand ? (
				<Row
					type="flex"
					justify="end"
					className="reserve"
					align="middle"
				>
					<h2>{formatter.format(parseInt(flight?.price))} COP</h2>
					<Button
						size="large"
						type="primary"
						onClick={() => selectFlight(selectedFlight, "AMADEUS")}
					>
						RESERVAR
					</Button>
				</Row>
			) : null}
		</Row>
	);
};
