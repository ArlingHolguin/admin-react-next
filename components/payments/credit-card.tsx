import { Select, Form, Input, Row, Col } from "antd";
import { useState } from "react";
import Card from "./child/card";
import "../../assets/components/payments/credit-card.less";

const CreditCard = ({ form, setForm }) => {
	const [franq, setFranq] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [titularName, setTitularName] = useState("");
	const [titularLastName, setTitularLastname] = useState("");
	const [expireDate, setExpireDate] = useState({ month: "", year: "" });
	const [cvv, setCvv] = useState("");

	const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;

	const handleExpireDateChange = (e) => {
		if (parseInt(e) > 12) {
			// it means that the year select has changed
			setExpireDate({ ...expireDate, year: e });
		} else if (e === "month" || e === "year") {
			return;
		} else {
			// it means that the month select has changed
			setExpireDate({ ...expireDate, month: e });
		}
	};

	const submitForm = () => {
		let fieldsValues;
		validateFieldsAndScroll((errors) => {
			if (!errors && expireDate.month !== "" && expireDate.year !== "") {
				const {
					card_number,
					cvv,
					titular_name,
					titular_lastname,
					email,
					phone,
					fees,
					bank,
					document
				} = getFieldsValue();
				fieldsValues = {
					cardNumber: card_number,
					ccv: cvv,
					titularName: titular_name,
					titularSurname: titular_lastname,
					doc: document,
					franq,
					expireDate,
					bank,
					phone,
					email,
					fees
				};
			} else {
				fieldsValues = { error: true };
			}
		});
		return fieldsValues;
	};

	return (
		<div id="tc-payment">
			<Card
				returnFranq={setFranq}
				cardN={cardNumber}
				titular={titularName + " " + titularLastName}
				expire={expireDate}
				cvv={cvv}
			/>
			<Form onBlur={() => setForm(submitForm())} style={{ width: "50%" }} colon={false}>
				<Row id="first-row" type="flex" justify="space-between">
					<Col span={24}>
					<Form.Item label="Número de tarjeta">
						{getFieldDecorator("card_number", {
							rules: [
								{
									len: franq == "american-express" ? 15 : 16,
									message: `Tienen que ser ${
										franq == "american-express" ? 15 : 16
									} caracteres!`
								},
								{
									required: true,
									message:
										"El número de la tarjeta es obligatorio!"
								},
								{
									pattern: new RegExp("^[0-9]*$"),
									message: "Debe ser un número"
								}
							]
						})(
							<Input
								onChange={(e) => setCardNumber(e.target.value)}
								maxLength={16}
							/>
						)}
					</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={16}>
					<Form.Item label="Fecha de expiración">
						<Input.Group compact>
							{/*Months */}
							<Select
								style={{ width: "50%" }}
								onChange={handleExpireDateChange}
								placeholder="Mes"
							>
								<Select.Option value="01">01</Select.Option>
								<Select.Option value="02">02</Select.Option>
								<Select.Option value="03">03</Select.Option>
								<Select.Option value="04">04</Select.Option>
								<Select.Option value="05">05</Select.Option>
								<Select.Option value="06">06</Select.Option>
								<Select.Option value="07">07</Select.Option>
								<Select.Option value="08">08</Select.Option>
								<Select.Option value="09">09</Select.Option>
								<Select.Option value="10">10</Select.Option>
								<Select.Option value="11">11</Select.Option>
								<Select.Option value="12">12</Select.Option>
							</Select>
							{/*Years */}
							<Select
								style={{ width: "50%" }}
								onChange={handleExpireDateChange}
								placeholder="Año"
							>
								<Select.Option value="21">2021</Select.Option>
								<Select.Option value="22">2022</Select.Option>
								<Select.Option value="23">2023</Select.Option>
								<Select.Option value="24">2024</Select.Option>
								<Select.Option value="25">2025</Select.Option>
								<Select.Option value="26">2026</Select.Option>
								<Select.Option value="27">2027</Select.Option>
								<Select.Option value="28">2028</Select.Option>
								<Select.Option value="29">2029</Select.Option>
								<Select.Option value="30">2030</Select.Option>
								<Select.Option value="31">2031</Select.Option>
								<Select.Option value="32">2032</Select.Option>
								<Select.Option value="33">2033</Select.Option>
								<Select.Option value="34">2034</Select.Option>
								<Select.Option value="35">2035</Select.Option>
								<Select.Option value="36">2036</Select.Option>
								<Select.Option value="37">2037</Select.Option>
								<Select.Option value="38">2038</Select.Option>
								<Select.Option value="39">2039</Select.Option>
								<Select.Option value="40">2040</Select.Option>
							</Select>
						</Input.Group>
					</Form.Item>
					</Col>
					<Col xs={12} lg={4}>
					<Form.Item  label="CVV">
						{getFieldDecorator("cvv", {
							rules: [
								{
									min: 3,
									message: "Debe tener mínimo 3 dígitos"
								},
								{
									max: 4,
									message: "Debe tener máximo 4 dígitos"
								},
								{
									required: true,
									message: "El cvv es obligatorio!"
								},
								{
									pattern: new RegExp("^[0-9]*$"),
									message: "Debe ser un numero"
								}
							]
						})(
							<Input.Password
								maxLength={4}
								onChange={(e) => setCvv(e.target.value)}
							/>
						)}
					</Form.Item>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col xs={24} md={11} lg={11}>
					<Form.Item
						label="Nombres del titular"
					>
						{getFieldDecorator("titular_name", {
							rules: [
								{
									required: true,
									message: "El nombre es obligatorio!"
								}
							]
						})(
							<Input
								onChange={(e) => setTitularName(e.target.value)}
							/>
						)}
					</Form.Item>
					</Col>
					<Col xs={24} md={11} lg={11}>
					<Form.Item
						label="Apellidos del titular "
					>
						{getFieldDecorator("titular_lastname", {
							rules: [
								{
									required: true,
									message: "El apellido es obligatorio!"
								}
							]
						})(
							<Input
								onChange={(e) =>
									setTitularLastname(e.target.value)
								}
							/>
						)}
					</Form.Item>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col xs={24} md={6} lg={6}>
					<Form.Item label="Email" >
						{getFieldDecorator("email", {
							rules: [
								{
									required: true,
									message: "El correo es obligatorio!"
								},
								{ type: "email", message: "correo no válido!" }
							]
						})(<Input />)}
					</Form.Item>
					</Col>
					<Col xs={24} md={6} lg={6}>
					<Form.Item label="Telefono" >
						{getFieldDecorator("phone", {
							rules: [
								{
									required: true,
									message: "El telefono es obligatorio!"
								}
							]
						})(<Input />)}
					</Form.Item>
					</Col>
					<Col xs={24} md={6} lg={6}>
					<Form.Item label="Cuotas" >
						{getFieldDecorator("fees", {
							rules: [
								{
									required: true,
									message: "Este campo es obligatorio!"
								}
							]
						})(
							<Select>
								{Array.from(
									{ length: 36 },
									(v, i) => i + 1
								).map((val) => (
									<Select.Option
										key={val}
										value={val.toString()}
									>
										{val}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Item>
					</Col>
				</Row>
				<Row type="flex" justify="space-between">
					<Col xs={24} md={11} lg={11}>
					<Form.Item label="Banco emisor de la tarjeta">
						{getFieldDecorator("bank", {
							rules: [
								{
									required: true,
									message: "Selecciona un banco emisor"
								}
							]
						})(
							<Select placeholder="Seleccione" showSearch>
								<Select.Option value="bancolombia">
									Bancolombia
								</Select.Option>
								<Select.Option value="banco de bogota">
									Banco de bogota
								</Select.Option>
								<Select.Option value="banco colpatria">
									Banco colpatria
								</Select.Option>
								<Select.Option value="banco de occidente">
									Banco de occidente
								</Select.Option>
								<Select.Option value="banco popular">
									Banco popular
								</Select.Option>
								<Select.Option value="citibank">
									Citibank
								</Select.Option>
								<Select.Option value="bancoomeva">
									Bancoomeva
								</Select.Option>
								<Select.Option value="banco santander">
									Banco Santander
								</Select.Option>
								<Select.Option value="banco pichincha">
									Banco pichincha
								</Select.Option>
								<Select.Option value="banco gnb sudameris">
									Banco GNB Sudameris
								</Select.Option>
								<Select.Option value="banco falabella">
									Banco falabella
								</Select.Option>
								<Select.Option value="banco caja social">
									Banco caja social
								</Select.Option>
								<Select.Option value="banco de bbva">
									Banco de BBVA
								</Select.Option>
								<Select.Option value="banco av villas">
									Banco AV villas
								</Select.Option>
								<Select.Option value="otro">Otro</Select.Option>
							</Select>
						)}
					</Form.Item>
					</Col>
					<Col xs={24} md={11} lg={11}>
					<Form.Item
						label="Número de documento"
					>
						{getFieldDecorator("document", {
							rules: [
								{ max: 10, message: "Máximo 10 caracteres!" },
								{
									required: true,
									message: "El documento es obligatorio!"
								}
							]
						})(<Input />)}
					</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const CreditCardForm = Form.create<Props>({
	name: "credit-card"
})(CreditCard);
export default CreditCardForm;
interface Props {
	form: any;
	setForm: any;
}
