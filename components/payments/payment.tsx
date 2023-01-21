import { Collapse, Row, Button } from "antd";
import { useEffect, useState } from "react";
import Notification from "../../lib/customNotifications";
import TermsAndConditions from "../share/TermsAndConditions";
import CreditCardForm from "./credit-card";
import ReserveNow from "./reserve-now";
import Pse from "./pse";
import Consignation from "./consignation";

const notification = new Notification();

const Payment = ({ width, hide = [], submitPayment, myReserves = false }) => {
	const payments = {
		1: "CREDIT",
		2: "PSE",
		3: "BANK",
		4: "AFTER"
	};
	const [showTerms, setShowTerms] = useState(false);
	const [terms, setTerms] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [paymentType, setPaymentType] = useState(null);
	const [creditCardInfo, setCreditCardInfo] = useState(null);

	const handleSubmitPayment = () => {
		// VALIDATIONS
		if (!terms) {
			notification.Info(
				"Acepta los terminos y condiciones",
				"Para continuar con tu compra debes aceptar los terminos y condiciones"
			);
			return;
		}

		if (!paymentType) {
			notification.Info(
				"Selecciona un metodo de pago",
				"Debes seleccionar un metodo de pago"
			);
			return;
		}

		if (paymentType == "CREDIT" && creditCardInfo?.error) {
			notification.Info(
				"Error en el formulario de pago",
				"Revisa que el formulario con la informacion de tu tarjeta de credito este diligenciado correctamente."
			);
			return;
		}

		// SEND PAYMENT
		submitPayment(paymentType, { terms, creditCardInfo });
	};

	useEffect(() => {
		if (paymentType == "CREDIT") {
			setIsButtonDisabled(
				!terms ? true : creditCardInfo?.error || !creditCardInfo ? true : false
			);
		} else {
			setIsButtonDisabled(
				terms && paymentType != null && paymentType != undefined
					? false
					: true
			);
		}
	}, [paymentType, terms, creditCardInfo]);

	return (
		<div id="pay" style={{ width }}>
			<div id="payment-logos">
				<div id="secure-payment">
					<img src="/static/img/payment-secure.png" />
					<p>Este es un sitio seguro</p>
				</div>
				<img src="/static/img/pci-certified.png" />
			</div>

			<Collapse
				expandIcon={({ isActive }) =>
					isActive ? (
						<img width="20" src="/static/img/active-checkbox.svg" />
					) : (
						<img
							width="20"
							src="/static/img/inactive-checkbox.svg"
						/>
					)
				}
				expandIconPosition="right"
				accordion
				onChange={(key: string) => setPaymentType(payments[key])}
			>
				{!hide.includes("CREDIT") && (
					<Collapse.Panel header="TARJETA DE CREDITO" key="1">
						<CreditCardForm setForm={setCreditCardInfo} />
					</Collapse.Panel>
				)}
				{!hide.includes("PSE") && (
					<Collapse.Panel header="PSE" key="2">
						<Pse />
					</Collapse.Panel>
				)}
				{!hide.includes("BANK") && (
					<Collapse.Panel header="Consignación" extra={<span style={{marginRight: '27px'}}>(+534 600)</span>} key="3">
						<Consignation />
					</Collapse.Panel>
				)}
				{!hide.includes("AFTER") && (
					<Collapse.Panel
						header="Reserva ahora, paga después"
						key="4"
					>
						<ReserveNow />
					</Collapse.Panel>
				)}
			</Collapse>

			<Row type="flex" justify="center">
				<TermsAndConditions
					showTermsSetter={{ showTerms, setShowTerms }}
					termsSetter={{ terms, setTerms }}
				/>
			</Row>

			<Row className="pay-button" type="flex" justify="center">
				<Button
					className="btn-pay"
					disabled={isButtonDisabled}
					size="large"
					style={{ marginBottom: "20px", padding: "8px 10px" }}
					type="primary"
					onClick={handleSubmitPayment}
					block
				>
					{paymentType === 'AFTER' ? 'Reservar' : myReserves ? 'Pagar' : 'Reservar y Pagar' }
				</Button>
			</Row>
			<style jsx>{`
				@media screen and (max-width: 426px) {
					#pay {
						width: 100% !important;
					}
				}
			`}</style>
		</div>
	);
};

export default Payment;
