import { Col, Form, Input, Row } from "antd";

const ContactFactureForm = ({ form, setFormsValue }) => {
	const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;

	const sanitizeData = () => {
		const { email, tel, address, city } = getFieldsValue();
		return {
			email,
			telephone: {
				area_code: "57",
				phone_number: tel
			},
			address,
			city
		};
	};

	const submitForm = () => {
		let fieldsData;
		validateFieldsAndScroll((errors) => {
			if (!errors) {
				fieldsData = sanitizeData();
			} else {
				fieldsData = { error: true };
			}
		});

		return fieldsData;
	};

	return (
		<Form
			layout="vertical"
			onBlur={() =>
				setFormsValue((prev) => ({ ...prev, contact: submitForm() }))
			}
		>
			<Row type="flex" gutter={16}>
				<Col xs={24} md={8} lg={8}>
					<Form.Item label="Teléfono">
						{getFieldDecorator("tel", {
							rules: [
								{
									required: true,
									message: "Por favor ingrese su teléfono!"
								}
							]
						})(<Input />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={16} lg={16}>
					<Form.Item label="Dirección">
						{getFieldDecorator("address", {
							rules: [
								{
									required: true,
									message: "Por favor ingrese su dirección!"
								}
							]
						})(<Input />)}
					</Form.Item>
				</Col>
			</Row>
			<Row type="flex" gutter={16}>
				<Col span={24}>
					<Form.Item label="Email">
						{getFieldDecorator("email", {
							rules: [
								{
									required: true,
									message:
										"Por favor ingrese su correo electrónico!"
								}
							]
						})(<Input />)}
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label="Ciudad">
						{getFieldDecorator("city", {
							rules: [
								{
									required: true,
									message: "Por favor ingrese su ciudad!"
								}
							]
						})(<Input />)}
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

const ContactFacture = Form.create<Props>({ name: "contact_facture" })(
	ContactFactureForm
);
export default ContactFacture;

export interface Props {
	form: any;
	setFormsValue: any;
}
