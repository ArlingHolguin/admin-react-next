import { useState, useEffect } from "react";
import moment from "moment";
import {
	Row,
	Col,
	AutoComplete,
	DatePicker,
	Select,
	Form,
	Button,
	notification,
	Tooltip,
	Input,
	Collapse
} from "antd";
import autocompleteCore from "../search/childs/autocomplete";
import "../../assets/components/forms/round_trip.less";
import Router, { useRouter } from "next/router";
import React from "react";
import Spinner from "../spinner/spinner";
import areInvalidDestines from "../helpers/areInvalidDestines";

const { Option } = AutoComplete;
const { RangePicker } = DatePicker;

const RoundTripForm = (props: Props) => {
	const router = useRouter();
	const { slug } = router.query;
	const [result, setResult] = useState([]);
	const [startValue, setStartValue] = useState(moment(new Date()));
	const [rangeValue, setRangeValue] = useState(null);
	const [rangeOpen, setRangeOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [codeDesct, setCodeDesct] = useState('')

	/**
	 * hooks para validaciones
	 */

	const [originData, setOriginData] = useState("");
	const [arrivalData, setArrivalData] = useState("");
	const [adults, setAdults] = useState(1);
	const [boys, setBoys] = useState(0);
	const [babys, setBabys] = useState(0);

	const [currentFlag, setCurrentFlag] = useState("");
	const [currentArrFlag, setCurrentArrFlag] = useState("");
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
		return resultSearch;
	};

	const childrenIda = result.map((item) => (
		<Option key={item.codigo} value={`${item.codigo},${item.isoCode}`}>
			{`${item.ciudad} - ${item.pais} - ${item.codigo}`}
		</Option>
	));

	const childrenVenida = result.map((item) => (
		<Option key={item.codigo} value={`${item.codigo},${item.isoCode}`}>
			{`${item.ciudad} - ${item.pais} - ${item.codigo}`}
		</Option>
	));

	/**
	 * Manejo de dias
	 */

	const disabledRangeDate = (rangeValue) => {
		if (!rangeValue) {
			return false;
		}
		const date = moment(new Date()).add(355, "days");
		const yesterday = moment(new Date()).subtract(1, "day");
		return rangeValue.valueOf() > date || rangeValue.valueOf() < yesterday;
	};

	const disabledStartDate = (startValue) => {
		const date = moment(new Date()).add(355, "days");
		const yesterday = moment(new Date()).subtract(1, "day");
		return startValue.valueOf() < yesterday || startValue.valueOf() > date;
	};

	const onStartChange = (value) => {
		setFieldsValue({ endTime: value });
		setStartValue(value);
	};

	const onRangeChange = (value) => {
		if (value) {
			setRangeValue(value);
		} else {
			alert("Debes seleccionar un dia de inicio");
		}
	};

	const handleStartOpenChange = (open) => {
		if (!open) {
			setRangeOpen(true);
		}
	};

	const handleRangeOpenChange = (open) => {
		setRangeOpen(open);
	};

	

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const invalidDestines = await areInvalidDestines(originData, arrivalData)

		if (invalidDestines) {
			openNotification("Error", "El origen y el destino no pueden ser iguales!", 3);
			setIsLoading(false);
			return;
		}

		if (!startValue && props.fligth === "trip") {
			openNotification("Error", "Falta la fecha de inicio", 3);
			setIsLoading(false);
			return;
		}
		if (
			(!rangeValue || !rangeValue.length) &&
			props.fligth === "round_trip"
		) {
			openNotification("Error", "Faltan las fechas de viaje", 3);
			setIsLoading(false);
			return;
		}
		if (!originData) {
			openNotification("Error", "Falta una ciudad de origen", 3);
			setIsLoading(false);
			return;
		}
		if (!arrivalData) {
			openNotification("Error", "Falta una ciudad de llegada", 3);
			setIsLoading(false);
			return;
		}
		const sum = adults + boys;
		if (sum > 9) {
			openNotification(
				"Error",
				"El número máximo de pasajeros debe ser menor o igual a 9",
				3
			);
			setIsLoading(false);
			return;
		}

		if (babys > adults) {
			openNotification(
				"Error",
				"El numero de infantes debe ser igual o menor que el de adultos",
				4
			);
			setIsLoading(false);
			return;
		}
		
		setIsLoading(false);
		switch (props.fligth) {
			case "round_trip":
				Router.push({
					pathname: `/vuelos/${
						props.fligth
					}/${originData}/${arrivalData}/${rangeValue[0].format(
						"YYYY-MM-DD"
					)}/${rangeValue[1].format(
						"YYYY-MM-DD"
					)}/${adults}/${boys}/${babys}/${codeDesct}`
				});
				break;
			case "trip":
				Router.push({
					pathname: `/vuelos/${
						props.fligth
					}/${originData}/${arrivalData}/${startValue.format(
						"YYYY-MM-DD"
					)}/null/${adults}/${boys}/${babys}/${codeDesct}`
				});
				break;
			default:
				break;
		}
	};

	const openNotification = (message, description, duration) => {
		const args = {
			message,
			description,
			duration
		};
		notification.open(args);
	};

	const {
		getFieldDecorator,
		getFieldsError,
		getFieldError,
		isFieldTouched,
		setFieldsValue
	} = props.form;

	/**
	 * inicialized validations
	 */

	const originError = isFieldTouched("origin") && getFieldError("origin");
	const dateError = getFieldError("startTime");
	const dateEndError = getFieldError("endTime");
	const adultsError = getFieldError("adults");
	const boysError = getFieldError("boys");
	const babysError = getFieldError("babys");

	const isRoundtrip = props.fligth == "round_trip";

	useEffect(() => {
		if (slug) {
			const org = handleSearch(slug[1]);
			setCurrentFlag(org[0].isoCode);
			setFieldsValue({
				origin: `${org[0].ciudad} - ${org[0].pais} - ${org[0].codigo}`
			});
			const arr = handleSearch(slug[2]);
			setCurrentArrFlag(arr[0].isoCode);
			setFieldsValue({
				arrival: `${arr[0].ciudad} - ${arr[0].pais} - ${arr[0].codigo}`
			});
			setFieldsValue({
				startTime: moment(slug[3]),
				rangeTime: [moment(slug[3]), moment(slug[4])],
				adults: slug[5],
				boys: slug[6],
				babys: slug[7]
			});

			setOriginData(slug[1]);
			setArrivalData(slug[2]);
			setStartValue(moment(slug[3]));
			slug[0] == "round_trip"
				? setRangeValue([moment(slug[3]), moment(slug[4])])
				: null;
			setAdults(parseInt(slug[5]));
			setBoys(parseInt(slug[6]));
			setBabys(parseInt(slug[7]));

			if(slug[8]){
				setCodeDesct(slug[8])
			}

			slug[0] == "trip"
				? props.setTypeFligth("trip")
				: props.setTypeFligth("round_trip");
		}
	}, [slug]);

	useEffect(() => {
		if(slug){
			setFieldsValue({
				startTime: moment(slug[3]),
				rangeTime: [moment(slug[3]), slug[4] && slug[4] != "null" ? moment(slug[4]) : moment(slug[3])  ],
			});
		}
	}, [props.fligth])
	
	const flag = "🇺🇸";
	return (
		<>
			<Spinner visible={isLoading} type={4} />
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Row type="flex" justify="space-between">
					<React.Fragment>
						<Col lg={isRoundtrip ? 5 : 6} md={12} sm={24} xs={24}>
							<h3 style={{ color: "white" }}>Origen</h3>
							<Form.Item
								validateStatus={originError ? "error" : ""}
								help={originError || ""}
							>
								{getFieldDecorator("origin", {
									rules: [
										{
											required: true,
											message: "Seleccione un origen"
										},
										{
											message:
												"Destino y origen no pueden ser iguales",
											validator: (rule, value, cb) => {
												if (value === arrivalData) {
													cb(true);
												}
											}
										}
									]
								})(
									<AutoComplete
										onChange={(e) => {
											if (e === "") setCurrentFlag("");
										}}
										style={{ width: "100%" }}
										dataSource={childrenIda}
										onSearch={value => handleSearch(value, true)}
										dropdownClassName="dropdown-city"
										onSelect={(value) => {
											const _value = value
												.toString()
												.split(",")[0];
											const _flag = value
												.toString()
												.split(",")[1];
											setCurrentFlag(_flag);
											setOriginData(_value);
										}}
									>
										<Input
											placeholder="Ej. Ciudad, región, zona o nombre de hotel"
											prefix={
												currentFlag !== "" ? (
													<img
														src={`/static/img/flag-icon/${currentFlag.toLowerCase()}.svg`}
														style={{
															width: "20px",
															marginRight: "15px",
															borderRadius:
																"100%",
															marginLeft: "-5px"
														}}
													/>
												) : null
											}
										/>
									</AutoComplete>
								)}
							</Form.Item>
						</Col>
						<Col lg={isRoundtrip ? 5 : 6} md={12} sm={24} xs={24}>
							<h3 style={{ color: "white" }}>Destino</h3>
							<Form.Item>
								{getFieldDecorator("arrival", {
									rules: [
										{
											required: true,
											message: "Seleccione un destino"
										},
										{
											message:
												"Destino y origen no pueden ser iguales",
											validator: (rule, value, cb) => {
												if (originData === value) {
													cb(true);
													return;
												}
											}
										}
									]
								})(
									<AutoComplete
										onChange={(e) => {
											if (e === "") setCurrentArrFlag("");
										}}
										style={{ width: "100%" }}
										dataSource={childrenVenida}
										onSearch={value => handleSearch(value, true)}
										dropdownClassName="dropdown-city"
										onSelect={(value) => {
											const _value = value
												.toString()
												.split(",")[0];
											const _flag = value
												.toString()
												.split(",")[1];
											setCurrentArrFlag(_flag);
											setArrivalData(_value);
										}}
									>
										<Input
											className="no-pad-right"
											placeholder="Ej. Ciudad, región, zona o nombre de hotel"
											prefix={
												currentArrFlag !== "" ? (
													<img
														src={`/static/img/flag-icon/${currentArrFlag.toLowerCase()}.svg`}
														style={{
															width: "20px",
															marginRight: "15px",
															borderRadius:
																"100%",
															marginLeft: "-5px"
														}}
													/>
												) : null
											}
										/>
									</AutoComplete>
								)}
							</Form.Item>
						</Col>
						{isRoundtrip ? (
							<Col lg={7} md={12} sm={24} xs={24}>
								<h3 style={{ color: "white" }}>
									Fechas de viaje
								</h3>
								<Form.Item
									validateStatus={dateEndError ? "error" : ""}
									help={dateEndError || ""}
								>
									{getFieldDecorator("rangeTime", {
										rules: [
											{
												required: true,
												message:
													"Seleccione fechas de viaje"
											}
										]
									})(
										<RangePicker
											style={{
												width: "100%",
												minWidth: "100%"
											}}
											disabledDate={disabledRangeDate}
											format="YYYY-MM-DD"
											placeholder={["Salida", "Regreso"]}
											onChange={onRangeChange}
											open={rangeOpen}
											onOpenChange={handleRangeOpenChange}
											dropdownClassName={`
												disable-arrow-next-year
												disable-arrow-back-year
												disable-select-mode
												custom-arrow-style
											`}
										/>
									)}
								</Form.Item>
							</Col>
						) : (
							<Col lg={5} md={5} sm={11} xs={11}>
								<h3 style={{ color: "white" }}>Fecha salida</h3>
								<Form.Item
									validateStatus={dateError ? "error" : ""}
									help={dateError || ""}
								>
									{getFieldDecorator("startTime", {
										rules: [
											{
												required: true,
												message:
													"Seleccione fecha de ida"
											}
										]
									})(
										<DatePicker
											style={{
												width: "100%",
												minWidth: "100%"
											}}
											disabledDate={disabledStartDate}
											format="YYYY-MM-DD"
											placeholder="Salida"
											onChange={onStartChange}
											onOpenChange={handleStartOpenChange}
											dropdownClassName={`
												disable-arrow-next-year
												disable-arrow-back-year
												disable-select-mode
												custom-arrow-style
											`}
										/>
									)}
								</Form.Item>
							</Col>
						)}
					</React.Fragment>

					<Col lg={6} md={12} sm={11} xs={24}>
						<Row type="flex" justify="space-between">
							<Col span={7}>
								<h4 style={{ color: "white", height: 26 }}>
									Adultos
								</h4>
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
												validator: (
													rule,
													value,
													cb
												) => {
													if (value < babys) {
														cb(
															"los infantes deben ser igual o menor al número de adultos"
														);
														return;
													}
													if (
														parseInt(value) + boys >
														9
													) {
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
												setAdults(
													parseInt(item.toString())
												)
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
								<h4 style={{ color: "white", height: 26 }}>
									Niños
									<Tooltip title="De 2 a 11 años, niños">
										<span className="age-indicator">!</span>
									</Tooltip>
								</h4>
								<Form.Item
									validateStatus={boysError ? "error" : ""}
									help={boysError || ""}
								>
									{getFieldDecorator("boys", {
										rules: [
											{
												validator: (
													rule,
													value,
													cb
												) => {
													const sum =
														parseInt(value) +
														adults;
													if (sum > 9) {
														cb(
															"El número máximo de pasajeros debe ser menor o igual a 9"
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
												setBoys(
													parseInt(item.toString())
												)
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
									Infantes
									<Tooltip title="Menor de 2 años, infante">
										<span className="age-indicator">!</span>
									</Tooltip>
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
												validator: (
													rule,
													value,
													cb
												) => {
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
												setBabys(
													parseInt(item.toString())
												)
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
					</Col>
				</Row>
				<Row type="flex" justify="start" >
				<Col lg={5} md={5} sm={11} xs={11}>
					<Collapse
						bordered={false}
						className="ghost-collapse code-desct-collapse"
						expandIcon={() =>
							<div className="code-desct-collapse-label">
								<p>¿Tienes un código de descuento?</p>
							</div>
						}
					>
						<Collapse.Panel
						header="" 
						key="1"
						>
						<h3 style={{ color: "white" }}>Código de Descuento</h3>
						<Form.Item>
							{getFieldDecorator("code_desct", {
								rules: [],
								initialValue: slug ? slug[8] || null : null
							})(<Input 
								onChange={(e) => setCodeDesct(e.target.value) }
								placeholder="Ej. CODIGO10" 
							/>)}
						</Form.Item>
						</Collapse.Panel>
					</Collapse>
					</Col>
				</Row>
				<Row type="flex" justify="end" style={{ marginTop: 16 }}>
					<Button type="primary" htmlType="submit" size="large">
						Buscar Vuelo
					</Button>
				</Row>
				<style jsx>
					{`
						.age-indicator {
							padding: 2px 6px;
							background: #df395d;
							color: white;
							border-radius: 50%;
							margin-left: 5px;
							font-size: 10px;
						}
					`}
				</style>
			</Form>
		</>
	);
};

const RoundTrip = Form.create<Props>({ name: "round_trip" })(RoundTripForm);
export default RoundTrip;

interface Props {
	setTypeFligth: any;
	data: any;
	fligth: any;
	form: any;
}
