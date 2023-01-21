import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import Service from "../../services";
import Notification from "../../lib/customNotifications";

const PhoneReservationForm = ({ form }) => {
	const { getFieldDecorator, getFieldsValue } = form;
	const [isConsultDisabled, setIsConsultDisabled] = useState(true);

	const service = new Service();
	const notification = new Notification();

	const handleSubmit = (e: any) => {
		e.preventDefault();

		service.CustomerRequestCall(
			getFieldsValue()
		).then((res: any) => {
			if (res?.status == "ok") {
				notification.Success(
					"Genial!!!",
					"Su Solicitud ha sido creada exitosamente, " +
					"nuestros agentes se comunicaran con usted"
				);
			} else {
				notification.Error(
					"Se produjo un error",
					"Por favor verifica los campos del formulario"
				);
			}

			form.resetFields();
		})
	};

	useEffect(() => {
		const emptyValues = Object.values(getFieldsValue()).filter(
			(val) => val == "" || val == " " || val == undefined
		);
		setIsConsultDisabled(emptyValues.length == 0 ? false : true);
	}, [getFieldsValue()]);

	return (
		<div style={{ textAlign: "center" }}>
			<h2 style={{ color: "#DF395D" }}>Reserva Telefónica</h2>
			<p>
				Comuníquese con nosotros a través de los siguientes números
				telefónicos:
			</p>
			<div>
				<p>(+57) 2 486 55 50</p>
				<p>(+57)1 390 50 74</p>
			</div>
			<p>
				Si desea que nos comuniquemos con usted, déjanos tus datos de
				contacto
			</p>

			<Form onSubmit={handleSubmit}>
				<Form.Item>
					{getFieldDecorator("name", {
						rules: [
							{
								required: true,
								message: "El nombre es obligatorio!"
							}
						]
					})(<Input placeholder="Nombre" />)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("last-name", {
						rules: [
							{
								required: true,
								message: "El apellido es obligatorio!"
							}
						]
					})(<Input placeholder="Apellido" />)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("phone", {
						rules: [
							{
								required: true,
								message: "El teléfono es obligatorio!"
							}
						]
					})(<Input placeholder="Teléfono" />)}
				</Form.Item>
				<Form.Item>
					<Button disabled={isConsultDisabled} size="large" htmlType="submit" block type="primary">
						Enviar
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

const PhoneReservation = Form.create({ name: "phone-reservation" })(
	PhoneReservationForm
);
export default PhoneReservation;
