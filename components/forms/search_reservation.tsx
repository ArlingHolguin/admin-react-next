import { Button, Form, Input, Row, Icon } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../assets/components/forms/search_reservation.less";

const ConsultReservationForm = ({
	form,
	reqParams,
	loading,
	setLoading,
	setHasClicketButton
}) => {
	const { getFieldDecorator, getFieldsValue } = form;
	const [isConsultDisabled, setIsConsultDisabled] = useState(true);

	const router = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		setHasClicketButton(true);
		reqParams(getFieldsValue());
	};

	useEffect(() => {
		const emptyValues = Object.values(getFieldsValue()).filter(
			(val) => val == "" || val == " " || val == undefined
		);
		setIsConsultDisabled(emptyValues.length == 0 ? false : true);
	}, [getFieldsValue()]);

	return (
		<Row className="consult-reservation">
			<Row className="extra-info">
				<h4 style={{ color: "#555" }}>
					Para consultar su reserva ingrese los datos de la siguiente
					manera:
				</h4>
				<br />
				<h4 style={{ color: "#555" }}>
					Ingrese el código de reserva por ejemplo: por ejemplo{" "}
					<span style={{ color: "#DF395D" }}>TQSWYZ</span>
				</h4>
				<h4 style={{ color: "#555" }}>
					Ingrese el primer apellido del pasajero
				</h4>
			</Row>

			<Row className="consult-reservation-form">
				<Form onSubmit={handleSubmit}>
					<Form.Item colon={false} label="Código de reserva">
						{getFieldDecorator("reservation_code", {
							rules: [
								{
									required: true,
									message:
										"El código de reserva es obligatorio!"
								}
							],
							initialValue: router.query.codigo
						})(<Input />)}
					</Form.Item>
					<Form.Item colon={false} label="Primer apellido">
						{getFieldDecorator("lastname", {
							rules: [
								{
									required: true,
									message:
										"Tu primer apellido es obligatorio!"
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item>
						<Button
							disabled={isConsultDisabled}
							loading={loading}
							htmlType="submit"
							type="primary"
							block
						>
							Consultar
						</Button>
					</Form.Item>
				</Form>
			</Row>

			<Row style={{ textAlign: "center" }}>
				<h4 style={{ color: "#555" }}>
					<Icon
						style={{
							color: "#fff",
							backgroundColor: "#DF395D",
							padding: "2px",
							margin: "5px",
							borderRadius: "100px"
						}}
						type="exclamation"
					/>
					Recuerde que su código de reserva es personal e
					intransferible
				</h4>
			</Row>
		</Row>
	);
};

const SearchReservation = Form.create<Props>({ name: "consult_reservation" })(
	ConsultReservationForm
);
export default SearchReservation;
interface Props {
	form: any;
	reqParams: any;
	loading: boolean;
	setLoading: any;
	setHasClicketButton: any;
}
