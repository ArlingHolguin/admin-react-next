import { Form, Row, Col, Input, Button } from "antd";
import { useEffect, useState } from "react";
import Service from "../../services";
import Notification from "../../lib/customNotifications";

const ConsultForm = ({ form }) => {
	const { getFieldDecorator, getFieldsValue } = form;
	const [isConsultDisabled, setIsConsultDisabled] = useState(true);

	const service = new Service();
	const notification = new Notification();

	const handleSubmit = (e: any) => {
		e.preventDefault();

		service.CustomerRequestContact(
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
		<Row style={{ textAlign: "center" }}>
			<h2 style={{ color: "#DF395D" }}>Solicitud</h2>
			<Form onSubmit={handleSubmit}>
				<Row type="flex" justify="space-between">
					<Col style={{ width: "48%" }}>
						<Form.Item>
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "El nombre es obligatiorio!"
									}
								]
							})(<Input placeholder="Nombre" />)}
						</Form.Item>
					</Col>
					<Col style={{ width: "48%" }}>
						<Form.Item>
							{getFieldDecorator("last-name", {
								rules: [
									{
										required: true,
										message: "El apellido es obligatiorio!"
									}
								]
							})(<Input placeholder="Apellido" />)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Form.Item>
						{getFieldDecorator("phone", {
							rules: [
								{
									required: true,
									message: "El telefono es obligatiorio!"
								}
							]
						})(<Input placeholder="Teléfono" />)}
					</Form.Item>
				</Row>
				<Row>
					<Form.Item>
						{getFieldDecorator("email", {
							rules: [
								{
									required: true,
									message: "El email es obligatiorio!"
								}
							]
						})(<Input placeholder="Email" />)}
					</Form.Item>
				</Row>
				<Row>
					<Form.Item>
						{getFieldDecorator("request", {
							rules: [
								{
									required: true,
									message: "La peticion es obligatioria!"
								}
							]
						})(<Input placeholder="Petición" />)}
					</Form.Item>
				</Row>
				<Row>
					<Form.Item>
						<Button
							disabled={isConsultDisabled}
							htmlType="submit"
							type="primary"
							block
							size="large"
						>
							Enviar
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Row>
	);
};

const Consult = Form.create({ name: "consult" })(ConsultForm);
export default Consult;
