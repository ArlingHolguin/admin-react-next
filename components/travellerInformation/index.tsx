import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Notification from "../../lib/customNotifications";
import General from "../../lib/MyReservation/general";
import organizePaymentInfo from "../../lib/payInfo";
import Service from "../../services";
import PassengerData from "./passengerData";
import ContactFacture from "../forms/contact_facture";
import Payment from "../payments/payment";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import { useLocalStorageCallback } from "../../hooks/useLocalStorageCallback";
import Spinner from "../spinner/spinner";
import { RECORD_ERROR } from '../../constans'
import { useSessionStorage } from "../../hooks/useSessionStorage";

const service = new Service();

const TravellerInformation = ({ reservation }) => {
	const router = useRouter();
	const [showSpinner, setShowSpinner] = useState(false);
	const [ip, setIp] = useState(null);
	const [formsValue, setFormsValue] = useState({
		contact: null,
		person: null
	});
	const [flightsTo, setFlightsTo] = useLocalStorage("flightsTo", null);
	const [reservationFinish, setReservationFinish] = useLocalStorageCallback(
		"reservation",
		null
	);
	const [reserveDataPayments, setReserveDataPayments] = useLocalStorage(
		"reservation_payments",
		null
	);
	const [reserveLocalCode, setReserveLocalCode] = useLocalStorage(
		"local_code",
		null
	);
	const [recordInfo, setRecordInfo] = useSessionStorage(
		"recordInfo",
		null
	);
	const [passenger, setPassenger] = useLocalStorage("passenger", {
		adults: 1,
		children: 0,
		babies: 0
	});

	const notification = new Notification();

	const getTravellersInfomation = () => {
		const adults: Array<object> = [];
		const children: Array<object> = [];
		const babies: Array<object> = [];

		const adultsForms = Object.keys(formsValue.person).filter((formName) =>
			formName.includes("ADT")
		);
		const childrenForms = Object.keys(formsValue.person).filter(
			(formName) => formName.includes("CHD")
		);
		const babiesForms = Object.keys(formsValue.person).filter((formName) =>
			formName.includes("INF")
		);

		adultsForms.forEach((formName) =>
			adults.push(formsValue.person[formName])
		);
		childrenForms.forEach((formName) =>
			children.push(formsValue.person[formName])
		);
		babiesForms.forEach((formName) =>
			babies.push(formsValue.person[formName])
		);

		return {
			adults,
			children,
			babies
		};
	};

	const handleRecordError = (localRecord, error) => {
		if(!localRecord){
			if(error === RECORD_ERROR.TIME_LIMIT){
				notification.Error(
					"Tiempo límite superado",
					"Has superado el tiempo límite de permanencia en esta sección, por favor vuelve a realizar una nueva búsqueda."
				);
				router.back()
			} else if (error === RECORD_ERROR.REPEAT){
				notification.Error(
					"Reserva repetida",
					"Ya existe una reservación a su nombre con estas características."
				);
			} else {
				notification.Error(
					"¡Algo salió mal!",
					"Ocurrió un error al momento de crear la reservación, por favor vuelve a intentarlo."
				);
				router.push("/")
			}
		} else {
			if(error === RECORD_ERROR.SEGMENTS){
				notification.Info(
					"Atencion!",
					`Tu reserva con el número (${localRecord}) ha sido generada con errores en algunos segmentos, por favor contacta a soporte. `,
					40
				);
			}
		}
	}

	const submitPayment = (paymentType, { terms, creditCardInfo }) => {
		const totalAdults = Number(passenger.adults);
		const totalChildren = Number(passenger.children);
		const totalBabies = Number(passenger.babies);
		const totalPassengerForms = totalAdults + totalChildren + totalBabies;

		// Person form validations
		if (formsValue.person == null) {
			notification.Error(
				"Error con el formulario de pasajeros",
				"Por favor revisa los formularios con la información de los pasajeros"
			);
			return;
		}

		if (Object.keys(formsValue.person).length < totalPassengerForms) {
			notification.Error(
				"Error con el formulario de pasajeros",
				"El formulario está incompleto"
			);
			return;
		}

		const hasPersonError = Object.values(formsValue.person).find((v) => v["error"]);

		if (!formsValue.person || hasPersonError) {
			notification.Error(
				"Error con el formulario de pasajeros",
				"Revisa que el formulario no tenga errores"
			);
			return;
		}

		// Contact form validations
		if (!formsValue.contact || formsValue.contact.error) {
			notification.Error(
				"Error con el formulario de contacto",
				"Revisa que el formulario no tenga errores"
			);
			return;
		}

		try {
			const contact = formsValue.contact;
			const ccInfo = creditCardInfo;

			const { adults, children, babies } = getTravellersInfomation();
			let travellers = [...adults, ...children, ...babies];

			setShowSpinner(true);

			service
				.Record(
					reservation[0].token,
					travellers,
					contact,
					flightsTo?.national
				)
				.then(({ results: localRecord, error }) => {
					if (!localRecord) {
						handleRecordError(null, error)
						setShowSpinner(false);
						return;
					}

					const lastName = travellers[0]["surname"].split(" ")[0];
					const searchRecord = () =>
						service
							.SearchRecord(lastName, localRecord)
							.then((reservationData) => {
								const parsedData = General(reservationData);
								setReservationFinish(parsedData);
								setReserveDataPayments(
									reservationData.payments || null
								);
								setReserveLocalCode(
									reservationData.local_record || null
								);
								setRecordInfo({
									lastName,
									localRecord
								})
							});

					if(error){
						handleRecordError(localRecord, error)
					} else {
						notification.Success(
							"Excelente",
							`Tu reserva con el número (${localRecord}) ha sido generada con éxito.`
						);
					}
					
					if (paymentType != "CREDIT") {
						searchRecord().then(() => {
							service.Pay(paymentType);
							if(["AFTER"].includes(paymentType)){
								router.push("/tienda/mis-reservas");
							}
						});
						setShowSpinner(false);
						return;
					}

					const paymentInfo = organizePaymentInfo(ccInfo, terms, ip);
					searchRecord().then(() => {
						service
							.Pay(paymentType, localRecord, paymentInfo)
							.then(({ status, message, p2p, redirect }) => {
								window.sessionStorage.setItem(
									"p2pInformation",
									JSON.stringify(p2p)
								);

								if (!status) {
									notification.Info(
										"¡Ooops, algo salió mal!",
										`${message}, por favor comunícate con nuestros asesores`
									);
									router.push("/tienda/mis-reservas")
									setShowSpinner(false);
									return;
								}

								if (redirect.includes("thanks")) {
									router
										.push("/tienda/gracias")
										.then(() => setShowSpinner(false));
								} else {
									router
										.push("/tienda/mis-reservas")
										.then(() => setShowSpinner(false));
								}

								notification.Info(
									"Informacion del estado de tu reserva",
									`Tu reserva con el número (${localRecord}) ha sido ${message} y emitida.
                                         \nPuedes revisa el estado de tu reserva en https://tiquetesytiquetes.com/tienda/mis-reservas.`
								);
								
							});
					});
				});
		} catch (e) {
			notification.Info("Ocurrio un error", "Por favor intenta de nuevo");
			setShowSpinner(false);
			return;
		}
	};

	useEffect(() => {
		const getIpAddress = async () => {
			const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
			const data = await res.text();
			let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
			const ipAddress = data.match(ipRegex)[0];
			setIp(ipAddress);
		};

		if (!ip) getIpAddress();
	}, []);

	return (
		<Col span={14} className="data">
			<Spinner visible={showSpinner} />
			<Row className="data-passengers">
				<PassengerData setFormsValue={setFormsValue} />
			</Row>
			<hr></hr>
			<Row id="contact-facturation">
				<h3>Datos de contacto y facturación</h3>

				<ContactFacture setFormsValue={setFormsValue} />
				<hr></hr>
			</Row>
			<Row className="pay-section">
				<h3>Selecciona un método de pago</h3>
				<Payment width="100%" submitPayment={submitPayment} hide={["PSE", "BANK"]} />
			</Row>
		</Col>
	);
};

export default TravellerInformation;
