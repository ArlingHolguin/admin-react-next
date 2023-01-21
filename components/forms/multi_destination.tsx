import {
	Form,
	Input,
	Icon,
	Button,
	Row,
	Col,
	AutoComplete,
	DatePicker,
	Select,
	notification
} from "antd";
import { useState } from "react";
import moment from "moment";
import "../../assets/components/forms/multi_destination.less";
import autocompleteCore from "../search/childs/autocomplete";
import Emoji from "../share/Emoji";
import Router from "next/router";
import Spinner from "../spinner/spinner";

const { Option } = AutoComplete;
let id = 2;
const MultiDestinationForm = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [startValue, setStartValue] = useState([moment(new Date())]);
	const [result, setResult] = useState([]);
	const [adults, setAdults] = useState(1);
	const [boys, setBoys] = useState(0);
	const [babys, setBabys] = useState(0);
	/**
	 * hooks para validaciones
	 */
	const [originData, setOriginData] = useState([""]);
	const [arrivalData, setArrivalData] = useState([""]);
	/**
	 * Manejo de busquedas autocompletar
	 * @param {*} value
	 */

	const handleSearch = (value, mix = false) => {
		let resultSearch;
		if (!value || value.indexOf("@") >= 0) {
			resultSearch = [];
		} else {
			if (mix && value.length >= 3) {
				resultSearch = autocompleteCore('mix', props.data, value.toLowerCase());
			} else if (value.length > 1 && value.length <= 3) {
				resultSearch = autocompleteCore(
					"codigo",
					props.data,
					value.toLowerCase()
				);
			} else if (value.length > 3) {
				resultSearch = autocompleteCore(
					"ciudad",
					props.data,
					value.toLowerCase()
				);
			} else {
				resultSearch = [];
			}
		}
		setResult(resultSearch);
	};
	const children = result.map((item) => (
		<Option key={item.codigo} value={item.codigo}>
			<Emoji data={item.bandera}></Emoji> {item.ciudad} - {item.pais} -{" "}
			{item.codigo}
		</Option>
	));

	const remove = (k) => {
		const { form } = props;
		// can use data-binding to get
		const keys = form.getFieldValue("keys");
		// We need at least one passenger
		if (keys.length === 1) {
			return;
		}

		// can use data-binding to set
		form.setFieldsValue({
			keys: keys.filter((key) => key !== k)
		});
	};

	const add = () => {
		const { form } = props;
		// can use data-binding to get
		const keys = form.getFieldValue("keys");
		const nextKeys = keys.concat(id++);
		if (id < 7) {
			// can use data-binding to set
			// important! notify form to detect changes
			form.setFieldsValue({
				keys: nextKeys
			});
		} else {
			alert("No se pueden mas de 6 tramos");
		}
	};

	const { getFieldDecorator, getFieldValue, getFieldError, isFieldTouched } =
		props.form;

	/**
	 * gestion de fechas
	 */

	const disabledStartDate = (startValue) => {
		const date = moment(new Date()).add(10, "months");
		return (
			startValue.valueOf() < moment(new Date()) ||
			startValue.valueOf() > date
		);
	};

	const onStartChange = (value) => {
		setStartValue(value);
	};

	/**
	 * inicialized validations
	 */

	const originError = isFieldTouched("origin") && getFieldError("origin");
	const dateError = getFieldError("startTime");
	const adultsError = getFieldError("adults");
	const boysError = getFieldError("boys");
	const babysError = getFieldError("babys");

	getFieldDecorator("keys", { initialValue: [0, 1] });
	const keys = getFieldValue("keys");

	const formItems = keys.map((k, index) => (
		<Row type="flex" justify="space-between" key={"rowForm-" + k}>
			<Col lg={7} md={12} sm={24} xs={24}>
				<h3 style={{ color: "white" }}>Origen</h3>
				<Form.Item
					key={k}
					validateStatus={originError ? "error" : ""}
					help={originError || ""}
				>
					{getFieldDecorator(`origin[${k}]`, {
						rules: [
							{ required: true, message: "Seleccione un origen" },
							{
								validator: (rule, value, cb) => {
									if (
										value ===
										props.form.getFieldsValue().arrival[k]
									) {
										cb(
											"El origen y el destino deben de ser distintos"
										);
									}
								}
							}
						]
					})(
						<AutoComplete
							style={{ width: "100%" }}
							onSearch={value => handleSearch(value, true)}
							placeholder="Ej. Ciudad, región, zona o nombre de hotel"
							optionLabelProp="text"
							onSelect={(value) =>
								setOriginData([...originData, value.toString()])
							}
						>
							{children}
						</AutoComplete>
					)}
				</Form.Item>
			</Col>
			<Col lg={7} md={12} sm={24} xs={24}>
				<h3 style={{ color: "white" }}>Destino</h3>
				<Form.Item>
					{getFieldDecorator(`arrival[${k}]`, {
						rules: [
							{
								required: true,
								message: "Seleccione un destino"
							},
							{
								validator: (rule, value, cb) => {
									if (
										value ===
										props.form.getFieldsValue().origin[k]
									) {
										cb(
											"El origen y el destino deben de ser distintos"
										);
									}
								}
							}
						]
					})(
						<AutoComplete
							style={{ width: "100%" }}
							onSearch={value => handleSearch(value, true)}
							placeholder="Ej. Ciudad, región, zona o nombre de hotel"
							optionLabelProp="text"
							onSelect={(value) =>
								setArrivalData([
									...originData,
									value.toString()
								])
							}
						>
							{children}
						</AutoComplete>
					)}
				</Form.Item>
			</Col>
			<Col lg={7} md={5} sm={11} xs={11}>
				<h3 style={{ color: "white" }}>Fecha salida</h3>
				<Form.Item
					validateStatus={dateError ? "error" : ""}
					help={dateError || ""}
				>
					{getFieldDecorator(`startTime[${k}]`, {
						rules: [
							{
								required: true,
								message: "Seleccione fecha de viaje"
							},
							{
								validator: (rule, value, cb) => {
									if (k !== 0) {
										if (
											value >
											props.form.getFieldsValue().arrival[
												k - 1
											]
										) {
											cb(
												"La fecha debe ser mayor que el tramo anterior"
											);
										}
									}
								}
							}
						]
					})(
						<DatePicker
							style={{ width: "100%", minWidth: "100%" }}
							disabledDate={disabledStartDate}
							format="YYYY-MM-DD"
							placeholder="Salida"
							onChange={onStartChange}
						/>
					)}
				</Form.Item>
			</Col>

			{index > 1 && (
				<Col lg={2} className="colRemove">
					<Button
						type="link"
						className="btnRemove"
						onClick={() => remove(k)}
					>
						<Icon type="minus-circle-o" />
					</Button>
				</Col>
			)}
		</Row>
	));

	const handleSubmit = (e) => {
		setIsLoading(true);
		e.preventDefault();
		const dataForm = props.form.getFieldsValue();

		const keys = dataForm.keys;
		let error = false;
		for (const item of keys) {
			if (dataForm.origin[item] === undefined) {
				openNotification("Error", "Debes completar todos los origenes");
				error = true;
				break;
			}
			if (dataForm.arrival[item] === undefined) {
				openNotification("Error", "Debes completar todos los destinos");
				error = true;
				break;
			}
			if (dataForm.origin[item] === dataForm.arrival[item]) {
				openNotification(
					"Error",
					"Origen y destino deben ser diferentes"
				);
				error = true;
				break;
			}

			if (dataForm.startTime[item] === undefined) {
				openNotification(
					"Error",
					"Por favor completa todas las fechas"
				);
				error = true;
				break;
			}

			if (item > 0) {
				if (dataForm.startTime[item] < dataForm.startTime[item - 1]) {
					openNotification(
						"Error",
						"Las fechas de los tramos no debe ser inferior a su tramo anterior"
					);
					error = true;
					break;
				}
			}
		}
		const sum = adults + boys;
		if (sum > 9) {
			openNotification(
				"Error",
				"El número máximo de pasajeros debe ser menor o igual a 9",
				3
			);
			return;
		}

		if (babys > adults) {
			openNotification(
				"Error",
				"El numero de infantes debe ser igual o menor que el de adultos",
				4
			);
			return;
		}
		if (error) {
			return;
		}

		Router.push({
			pathname: `/vuelos/multi_destination/${dataForm.origin}/${
				dataForm.arrival
			}/${dataForm.startTime.map((item) =>
				item.format("YYYY-MM-DD")
			)}/NA/${adults}/${boys}/${babys}`
		});
	};

	const openNotification = (message, description, duration = null) => {
		const args = {
			message,
			description,
			duration
		};
		notification.open(args);
	};

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 }
		}
	};

	return (
		<>
			<Spinner visible={isLoading} type={4} />
			<Form onSubmit={handleSubmit}>
				{formItems}
				<Button type="primary" onClick={add}>
					Añadir tramo
				</Button>
				<Form.Item {...formItemLayoutWithOutLabel}></Form.Item>
				<Row type="flex" justify="space-between">
					<Col span={7}>
						<h4 style={{ color: "white", height: 26 }}>Adultos</h4>
						<Form.Item
							validateStatus={adultsError ? "error" : ""}
							help={adultsError || ""}
						>
							{getFieldDecorator("adults", {
								rules: [
									{
										required: true,
										message:
											"Seleccione un número de adultos"
									},
									{
										validator: (rule, value, cb) => {
											if (value < babys) {
												cb(
													"los infantes deben ser igual o menor al número de adultos"
												);
												return;
											}
											if (parseInt(value) + boys > 9) {
												cb(
													"El número máximo de pasajeros debe ser menor o igual a 9"
												);
												return;
											}
										}
									}
								],
								initialValue: [1]
							})(
								<Select
									key="adults"
									style={{ width: "100%" }}
									onChange={(item) =>
										setAdults(parseInt(item.toString()))
									}
								>
									<Option value="1">1</Option>
									<Option value="2">2</Option>
									<Option value="3">3</Option>
									<Option value="4">4</Option>
									<Option value="5">5</Option>
									<Option value="6">6</Option>
									<Option value="7">7</Option>
									<Option value="8">8</Option>
									<Option value="9">9</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={7}>
						<h4 style={{ color: "white", height: 26 }}>Niños 12</h4>
						<Form.Item
							validateStatus={boysError ? "error" : ""}
							help={boysError || ""}
						>
							{getFieldDecorator("boys", {
								rules: [
									{
										validator: (rule, value, cb) => {
											const sum =
												parseInt(value) + adults;
											if (sum > 9) {
												cb(
													"El numero maximo de pasajeros permitidos es 9"
												);
												return;
											}
										}
									}
								],
								initialValue: [0]
							})(
								<Select
									key="boys"
									style={{ width: "100%" }}
									onChange={(item) =>
										setBoys(parseInt(item.toString()))
									}
								>
									<Option value="0">0</Option>
									<Option value="1">1</Option>
									<Option value="2">2</Option>
									<Option value="3">3</Option>
									<Option value="4">4</Option>
									<Option value="5">5</Option>
									<Option value="6">6</Option>
									<Option value="7">7</Option>
									<Option value="8">8</Option>
									<Option value="9">9</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={7}>
						<h4 style={{ color: "white", height: 26 }}>
							Infantes 2
						</h4>
						<Form.Item
							validateStatus={babysError ? "error" : ""}
							help={babysError || ""}
						>
							{getFieldDecorator("babys", {
								rules: [
									{
										message:
											"El número de adultos no debe ser menor a los infantes",
										validator: (rule, value, cb) => {
											if (value > adults) {
												cb(true);
												return;
											}
										}
									}
								],
								initialValue: [0]
							})(
								<Select
									style={{ width: "100%" }}
									onChange={(item) =>
										setBabys(parseInt(item.toString()))
									}
								>
									<Option value="0">0</Option>
									<Option value="1">1</Option>
									<Option value="2">2</Option>
									<Option value="3">3</Option>
									<Option value="4">4</Option>
									<Option value="5">5</Option>
									<Option value="6">6</Option>
									<Option value="7">7</Option>
									<Option value="8">8</Option>
									<Option value="9">9</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Row type="flex" justify="space-between">
						<Button type="primary" htmlType="submit">
							Buscar vuelo
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</>
	);
};

const MultiDestination = Form.create<Props>({ name: "multi_destination" })(
	MultiDestinationForm
);
export default MultiDestination;

export interface Props {
	data: any;
	form: any;
}
