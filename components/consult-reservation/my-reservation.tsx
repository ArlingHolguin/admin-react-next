import { Row, Tabs, Affix, Collapse, Button, Col } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../../assets/components/consult-reservation/reserve.less";
import Payment from "../payments/payment";
import organizePaymentInfo from "../../lib/payInfo";
import General from "../../lib/MyReservation/general";
import Service from "../../services";
import FlightTab from "./child/tabs/flights";
import Notification from "../../lib/customNotifications";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import { useLocalStorageCallback } from "../../hooks/useLocalStorageCallback"
import PaymentInfo from "./child/tables/paymentInfo";
import PaymentResume from "./child/payment-resume";
import useWindowDimensions from "../../hooks/useWindowsDimension";
import Spinner from "../spinner/spinner";

const notification = new Notification();
const service = new Service();

const MyReservation = ({handleLogout}) => {
	const router = useRouter();
	const [ip, setIp] = useState("");
	const { width } = useWindowDimensions();
	const [flightRecord, setFlightRecord] = useState<any>("");
	const [reserveData, setReserveData] = useLocalStorageCallback("reservation", null);
	const [showPayment, setShowPayment] = useState(true);
	const [reserveDataPayments, setReserveDataPayments] = useLocalStorage(
		"reservation_payments",
		null
	);
	const [ isLoading, setIsLoading ] = useState(false);
	const [reserveLocalCode, setReserveLocalCode] = useLocalStorage("local_code", null);

	const handleSubmit = (paymentType, { terms, creditCardInfo }) => {
		try {
			setIsLoading(true);
			const paymentInfo = organizePaymentInfo(creditCardInfo, terms, ip);

			const { localRecord, lastName } = JSON.parse(
				window.sessionStorage.getItem("recordInfo")
			);

			if (paymentType != "CREDIT") {
				service.Pay(paymentType);
				if(["BANK"].includes(paymentType)){
					notification.Info(
						"Gracias por tu reserva",
						`por favor comunícate con nuestros asesores una vez realices la consignacion`
					);
				}
				setIsLoading(false);
				return;
			}

			service
				.Pay(paymentType, localRecord, paymentInfo)
				.then(({ status, message, p2p, redirect }) => {
					service
						.SearchRecord(lastName, localRecord)
						.then((res) => setReserveData(General(res)));

					window.sessionStorage.setItem(
						"p2pInformation",
						JSON.stringify(p2p)
					);

					if (redirect.includes("thanks")) {
						router
							.push("/tienda/gracias")
							.then(() => setIsLoading(false));
					} else {
						router
							.push("/tienda/mis-reservas")
							.then(() => setIsLoading(false));
					}

					if (!status) {
						notification.Info(
							"¡Ooops, algo salió mal!",
							`${message}, por favor comunícate con nuestros asesores`
						);
						return;
					}
				});
		} catch (e) {
			setIsLoading(false);
			notification.Info(
				"¡Ooops, algo salió mal!",
				`por favor comunícate con nuestros asesores`
			);
			return;
		}
	};

	useEffect(() => {
		mustShowPayment();
		const getIpAddress = async () => {
			const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
			const data = await res.text();
			let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
			const ipAddress = data.match(ipRegex)[0];
			setIp(ipAddress);
		};

		getIpAddress();
	}, []);

	useEffect(() => {
		if (typeof window != undefined) {
			const record = window.sessionStorage.getItem("record");
			setFlightRecord(JSON.parse(record));
		}
	}, []);

	const mustShowPayment = () => {
		const someReserved = reserveData?.some(
			(reserve) =>
				!["emitido", "pagado"].includes(
					reserve.flightInfo.reserveState.toLowerCase()
				)
		);
		setShowPayment(someReserved);
	};

	const handleClickLogout = () => {
		setIsLoading(true);
		setReserveData(null, () => {
			handleLogout()
		})
	}

	if(isLoading){
		return (
			<Spinner visible={isLoading} type={6} />
		)
	}


	return (
		<Row type="flex" justify="center">
			<Row type='flex' justify='space-between' className="head-row">
				<Col>
					<h4>Codigo de Reserva Local:</h4>
					<h4 className="local-code">{reserveLocalCode}</h4>
				</Col>
				<Col>
					{width > 470 ? (
						<Button type="primary" onClick={handleClickLogout} icon="logout">
							Cerrar Sesion
						</Button>
					) : (
						<Button type="primary" onClick={handleClickLogout} shape='circle' icon="logout" />
					)}
				</Col>
			</Row>
			{reserveData.length == 1 && <FlightTab data={reserveData[0]} />}
			{reserveData.length > 1 && (
				<Tabs type="card" animated={true} className="reserve-tabs">
					{reserveData?.map((result) => (
						<Tabs.TabPane
							tab={`Código ${result.details.code_reserved} - ${result.flightInfo.reserveState}`}
							key={`${result.details.code_reserved}`}
						>
							<FlightTab data={result} />
						</Tabs.TabPane>
					))}
				</Tabs>
			)}
			<Row style={{ width: "100%" }}>
				<PaymentInfo data={reserveDataPayments} />
			</Row>
			{/*
            <div id="change-flight">
                <img src="/static/img/change-flight.png" />
                <Button type="primary">CAMBIA TU VUELO</Button>
            </div>

            <CustomSection _Icon={<img src="/static/img/silla.png" />} headText="Selecciona tu silla">
                <div id="select-seat">
                    <div id="seat-info">
                        <p>¡Ahora selecciona tu silla y disfrutarás de sus ventajas!</p>
                        <p>
                            <ul>
                                <li>Siéntate junto a tu acompañante</li>
                                <li>Disfruta de una mayor comodidad con espacio adicional para las piernas</li>
                                <li>Asegura una silla en primera fila de categoría superior</li>
                                <li>Disfrute de las vistas de un asiento en ventanilla</li>
                            </ul>
                        </p>
                    </div>
                    <Button size="large" type="primary" id="select-seat-button">
                        Seleccionar
                    </Button>
                </div>
            </CustomSection>
            <div style={{ width: '95%', textAlign: 'left', marginLeft: '5%' }}>
                <p>Estás a un paso de asegurar tu viaje, selecciona la forma de pago que prefieras</p>
            </div>
                */}

			{width > 615 ? (
				<Affix
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						zIndex: 10
					}}
					offsetBottom={20}
				>
					<Collapse defaultActiveKey="1" className="prices">
						<Collapse.Panel header="Resumen de precios" key="1">
							<div className="pay-resume">
								<PaymentResume />
							</div>
						</Collapse.Panel>
					</Collapse>
				</Affix>
			) : (
				<div className="pay-resume">
					<PaymentResume />
				</div>
			)}
			{showPayment && (
				<div id="payments-container">
					<h2>Selecciona un método de pago</h2>
					<Payment width="70%" submitPayment={handleSubmit} hide={["AFTER"]} myReserves />
				</div>
			)}
		</Row>
	);
};

export default MyReservation;
