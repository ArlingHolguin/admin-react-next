import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Row, Button, Empty, Modal } from "antd";
import Service from "../../services";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import { FlightItemNormal } from "../../components/flight/flight-item";
import { useFlightFilter } from "../../context/flightFilter.context";
import { useApp } from "../../context/app.context";
import { IFlight } from "../../models/flight.model";
import Spinner from "../spinner/spinner";
import Notification from "../../lib/customNotifications";
import FlightsPlaceHolder from "./flight-placeholder";
import ModalCodeDiscount from '../modals/codeDiscount';
import "../../assets/page/slug.less";

const FlightItemNDC = dynamic(
	() =>
		import("../../components/flight/flight-item").then(
			(i) => i.FlightItemNDC
		),
	{
		ssr: false
	}
);

const FlightItemAmadeus = dynamic(
	() =>
		import("../../components/flight/flight-item").then(
			(i) => i.FlightItemAmadeus
		),
	{
		ssr: false
	}
);

const service = new Service();

const FlightList = ({ handleLoadingRecomm, handleLoading }) => {
	const notification = new Notification();
	const routerLocal = useRouter();
	const slug = routerLocal.query.slug || [];
	const [isLoading, setIsLoading] = useState(true);
	const [showCodeDiscountModal, setShowCodeDiscountModal] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [section, setSection] = useState("ida");
	const [flightsTo, setFlightsTo] = useLocalStorage("flightsTo", null);
	const [flightsReturn, setFlightsReturn] = useLocalStorage(
		"flightsReturn",
		null
	);
	const [passengers, setPassenger] = useLocalStorage("passenger", null);
	const [price, setPrice] = useState(0);
	const { saveFlightSearch, flights, filterLoading } = useFlightFilter();
	const {
		selectError,
		saveSelectedFlightOrg,
		saveSelectedFlightReturn,
		saveMinPrice,
		saveSelectError,
		saveFlightIsInter
	} = useApp();
	const [isInterRT, setIsInterRT] = useState(false);
	const [isInter, setIsInter] = useLocalStorage("isInter", null);
	const [recommFLightsReturn, setRecommFLightsReturn] = useState<IFlight>();

	useEffect(() => {
		setIsLoading(true)
		handleLoadingRecomm(true)
		document.title = `Vuelos`;
		selectError && handleSelectError();
		setPassenger({ adults: slug[5], children: slug[6], babies: slug[7] });
		setFlightsTo(null);
		setFlightsReturn(null);
		const fetchData = async () => {
			const result = await service.Search(
				slug[0],
				slug[1],
				slug[2],
				slug[3],
				slug[5],
				slug[6],
				slug[7],
				slug[4],
				slug[8]
			);
			if (result) {
				handleLoading(false)
				saveFlightSearch(result[0]);
				saveMinPrice(result[0].summary.min_price);
				saveSelectedFlightOrg(null);
				setIsInterRT(result[0].isInterRT);
				saveFlightIsInter(result[0].isInter)
				setIsInter(result[0].isInter)
				result[1] ? setRecommFLightsReturn(result[1]) : null;
			} else {
				handleLoading(false)
				saveFlightSearch(undefined);
				saveMinPrice(undefined);
				saveSelectedFlightOrg(null);
				setIsInterRT(false);
				setIsInter(false)
				saveFlightIsInter(false);
				setRecommFLightsReturn(null);
				if(slug[8]){
					setShowCodeDiscountModal(true)
				}
			}
			setIsLoading(false);
			handleLoadingRecomm(false)
		};
		fetchData();
	}, [slug]);

	const scrollToTop = () => {
		if( window.pageYOffset > 100 ){
				window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
		}
	}

	const handleSelectError = () => {
		if(selectError.code){
			notification.Error(
				"Ha ocurrido un problema",
				selectError == "404"
					? "El vuelo seleccionado ya no está disponible."
					: "Vuelve a intentarlo."
			)
			saveSelectError(null)
		}
	};

	const flightsSeleted = async (
		f,
		provider,
		flightSelectedId = "",
		fReturn = null
	) => {
		scrollToTop()
		isInterRT ||
		slug[0] == "trip" ||
		(slug[0] == "round_trip" && flightsTo != null)
			? setShowSpinner(true)
			: setIsLoading(true);

		const split = f.offer_id.split("-");
		split.pop();
		const id = split.join("-");

		switch (slug[0]) {
			case "trip":
				if (provider === "NDC") {
					setFlightsTo({
						id,
						selected: flightSelectedId,
						type: "roundtrip",
						provider,
						branded: f.offer_item_id,
						national: isInterRT ? "internacional" : "nacional"
					});
				} else if (provider === "AMADEUS") {
					setFlightsTo({
						id: f.offer_id,
						selected: f.offer_item_id,
						type: "trip",
						provider,
						branded: f.brandId,
						national: isInterRT ? "internacional" : "nacional"
					});
				} else {
					setFlightsTo({
						id: f.offer_id,
						selected: f.offer_item_id,
						type: "trip",
						provider,
						national: isInterRT ? "internacional" : "national"
					});
				}
				goToPassenger();
				break;
			case "round_trip":
				if (isInterRT) {
					if (provider === "AMADEUS") {
						setFlightsTo({
							id: f.offer_id,
							selected: f.offer_item_id,
							type: "roundtrip",
							provider,
							branded: f.brandId,
							isInterRT,
							national: isInterRT ? "internacional" : "nacional"
						});
						setFlightsReturn({
							id: fReturn.offer_id,
							selected: fReturn.offer_item_id,
							type: "roundtrip",
							provider,
							branded: fReturn.brandId,
							isInterRT,
							national: isInterRT ? "internacional" : "nacional"
						});
					}
					goToPassenger();
				} else {
					if (flightsTo == null) {
						handleLoadingRecomm(true)
						setSection("regreso");
						const result = await service.Search(
							slug[0],
							slug[2],
							slug[1],
							slug[4],
							slug[5],
							slug[6],
							slug[7],
							slug[4],
							slug[8]
						);
						if(result){
							saveFlightSearch(result[0])
						} else {
							saveFlightSearch(undefined);
							saveMinPrice(undefined);
							saveSelectedFlightOrg(null);
							setIsInterRT(false);
							saveFlightIsInter(false);
							setIsInter(false);
							setRecommFLightsReturn(null);
							setSection("ida");
							notification.Error(
								"Vuelo no disponible",
									"El vuelo seleccionado ya no está disponible, porfavor intenta seleccionando otras fechas."
							)
						}
						setIsLoading(false);
						handleLoadingRecomm(false)
						if (provider === "NDC") {
							setFlightsTo({
								id,
								selected: flightSelectedId,
								type: "roundtrip",
								provider,
								branded: f.offer_item_id,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
						} else if (provider === "AMADEUS") {
							setFlightsTo({
								id: f.offer_id,
								selected: f.offer_item_id,
								type: "roundtrip",
								provider,
								branded: f.brandId,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
						} else {
							setFlightsTo({
								id: f.offer_id,
								selected: f.offer_item_id,
								type: "roundtrip",
								provider,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
						}
					} else {
						if (provider === "NDC") {
							setFlightsReturn({
								id,
								selected: flightSelectedId,
								type: "roundtrip",
								provider,
								branded: f.offer_item_id,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
						} else if (provider === "AMADEUS") {
							setFlightsReturn({
								id: f.offer_id,
								selected: f.offer_item_id,
								type: "roundtrip",
								provider,
								branded: f.brandId,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
							saveSelectedFlightReturn(f);
						} else {
							setFlightsReturn({
								id: f.offer_id,
								selected: f.offer_item_id,
								type: "roundtrip",
								provider,
								national: isInterRT
									? "internacional"
									: "nacional"
							});
						}
						goToPassenger();
					}
				}
				break;
			case "multi_destination":
				break;
			default:
				break;
		}
	};

	const goToPassenger = () => {
		Router.push({
			pathname: `/informacion-pasajeros`
		});
	};

	if (isLoading || filterLoading) {
		return (
			<div className="placeholder-wrapper">
				<FlightsPlaceHolder />
			</div>
		);
	}

	const hasAmadeusFlight = flights
		? flights.Amadeus && !(flights.Amadeus?.length < 1)
		: false;
	const hasNdcFlight = flights
		? flights.NDC && !(flights.NDC?.length < 1)
		: false;
	const hasKiuFlight = flights
		? flights.Kiu && !(flights.Kiu?.length < 1)
		: false;

	// Handling all cases for showing the empty state for recommendations
	if (!hasNdcFlight && !hasAmadeusFlight && !hasKiuFlight) {
		return (
			<>
			<ModalCodeDiscount 
				visible={showCodeDiscountModal} 
				onClose={() => setShowCodeDiscountModal(false)}
				currentSearch={slug}
			/>
			<Empty description="No se encontraron resultados para tu búsqueda" />
			</>
		);
	}

	return (
		<>
			<Spinner visible={showSpinner} type={1} />
			<div>
				<ModalCodeDiscount 
					visible={showCodeDiscountModal} 
					onClose={() => setShowCodeDiscountModal(false)}
					currentSearch={slug}
				/>
				<Row className="banner-section" style={{ textAlign: "center" }}>
					{isInterRT ? (
						<h2>Seleccione el vuelo</h2>
					) : (
						<h2>Seleccione el vuelo de {section}</h2>
					)}
				</Row>
				<Row>
					<h1 style={{padding: '10px 0', fontSize: '1.2em'}}>VIAJA CON TRANQUILIDAD</h1>
				</Row>
				<div className="flights flights__list scroll-bar">
					{flights["Kiu"] &&
						flights["Kiu"].map((item) => (
							<FlightItemNormal
								key={item.offer_id.toString()}
								selectFlight={(flight) =>
									flightsSeleted(flight, "KIU")
								}
								flight={item}
							/>
						))}
					{flights["Amadeus"] && (
						<FlightItemAmadeus
							flightsAmadeus={flights["Amadeus"]}
							passengers={{
								adults: slug[5],
								childs: slug[6],
								babies: slug[7]
							}}
							selectFlight={flightsSeleted}
							flightsReturn={recommFLightsReturn}
							rtInternational={isInterRT}
						/>
					)}
					{flights["NDC"] && (
						<FlightItemNDC
							flightsNDC={flights["NDC"]}
							passengers={{
								adults: slug[5],
								childs: slug[6],
								babies: slug[7]
							}}
							selectFlight={flightsSeleted}
						/>
					)}
					{/* {flights['NDC'] &&
                    flights['NDC'].map((item) => (
                        <FlightItemNormal key={item.offer_id.toString()} selectFlight={(flight) => flightsSeleted(flight, 'NDC')} flight={item} />
                    ))} */}
				</div>
				{price > 0 ? (
					<Row
						type="flex"
						justify="space-around"
						className="total"
						align="middle"
					>
						<p className="price-title">Total: </p>
						<div>
							<p className="price-title">$ {price}</p>
							<p className="taxes">IMPUESTOS INCLUIDOS</p>
						</div>
						<Button type="primary" onClick={(e) => goToPassenger()}>
							CONTINUAR
						</Button>
					</Row>
				) : null}
			</div>
		</>
	);
};

export default FlightList;
