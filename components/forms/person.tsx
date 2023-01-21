import { Col, Form, Input, Row, Select, DatePicker, Button } from "antd";
import { useState, useEffect } from "react";
import "../../assets/components/forms/adult_one.less";
import { useLocalStorageCallback } from "../../hooks/useLocalStorageCallback";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import moment from "moment";
import { useApp } from "../../context/app.context";
import air_codes from "../../public/static/data/aerolineas.json";
import countries from '../../public/static/data/paises.json'

const { Option } = Select;

const PersonForm = ({ form, type, index, setFormsValue }) => {
	const { resumeFlightInfo, flightIsInter } = useApp();
	const [documentType, setDocumentType] = useState("CC");
	const [optionAirlines, setOptionAirlines] = useState([]);
	const [gender, setGender] = useState("male");
	const [isInter, setIsInter] = useLocalStorage("isInter", null);
	const [flightInfo, setFlightInfo] = useLocalStorageCallback(
		"flightInfo",
		null
	);

	const [inputList, setInputList] = useState([{ airline: "", code: "" }]);

	useEffect(() => {
		if(flightIsInter || isInter){
			setDocumentType('Pasaporte')
		}
	}, [flightIsInter])

	useEffect(() => {
		if(resumeFlightInfo){
			let airlines = [];
			resumeFlightInfo.forEach(element => {
				airlines = [...airlines,  ...element.segments.map(s => {
					return s.airline
				})]
			});

			const uniqueAirlines = airlines.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
			})
			setOptionAirlines(uniqueAirlines)
		}
	}, [resumeFlightInfo])


	const getOptionsAirlines = () => {
		return optionAirlines.map((item, index) => (
			<Option 
				key={`${item}${index}`} 
				value={`${item}`}	
				disabled={inputList.map(i => i.airline).includes(item) }
			>
				{air_codes ? air_codes[item] ? air_codes[item]["name"] : item : item}
			</Option>
		));
	}

	const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;

	const validateBirthDate = (value) => {
		if (value) {
			const departureDateString = flightInfo ? flightInfo[0].date_flight : resumeFlightInfo ? resumeFlightInfo[0].date_flight : null;

			if(!departureDateString){
				return false;
			}

			const dateDepartureFormated = moment(departureDateString, "DDMMYY").format("MM/DD/YYYY")

			const dateDeparture = new Date(dateDepartureFormated).getTime();
			const diffBirthDate = new Date(
				dateDeparture - new Date(value).getTime()
			);
			const age = diffBirthDate.getUTCFullYear() - 1970;

			if (type == "ADT") {
				if (age > 11) return true;
				return false;
			}

			if (type == "CHD") {
				if (age >= 2 && age <= 11) return true;
				return false;
			}

			if (type == "INF") {
				if (age >= 0 && age < 2) return true;
				return false;
			}
		} else {
			return false;
		}
	};

	const validateExpiredDate = (value) => {
		if (value) {
			const departureDateString = flightInfo ? flightInfo[0].date_flight : resumeFlightInfo ? resumeFlightInfo[0].date_flight : null;

			if(!departureDateString){
				return false;
			}

			const dateDepartureFormated = moment(departureDateString, "DDMMYY").format("MM/DD/YYYY")
			const expiredDate = moment(value).format("MM/DD/YYYY")

			return !(new Date(expiredDate) <= new Date(dateDepartureFormated) )

		} else {
			return false;
		}
	};

	const childrenCountries = countries.map((item) => (
		<Option key={item.iso_code} value={`${item.iso_code}`}>
			{item.name}
		</Option>
	));

	const sanitizeData = () => {
		const {
			name,
			last_name,
			document,
			birthdate,
			expire_date,
			resident_country,
		} = getFieldsValue();
		console.log('Residente', resident_country)
		const birthdateYear = birthdate?.$y + "";
		const birthdateMonth = birthdate?.$M + 1 + "";
		const birthdateDay = birthdate?.$D + "";
		const docExpireYear = expire_date?.$y + "";
		const docExpireMonth = expire_date?.$M + 1 + "";
		const docExpireDay = expire_date?.$D + "";
		const paxDocInfo =
			documentType == "Pasaporte"
				? {
						document: {
							doc_id: document,
							doc_Type: documentType,
							doc_expire: `${docExpireYear}-${
								docExpireMonth.length == 1
									? 0 + docExpireMonth
									: docExpireMonth
							}-${
								docExpireDay.length == 1
									? 0 + docExpireDay
									: docExpireDay
							}`,
							residency: resident_country
						}
				  }
				: {
						document: {
							doc_id: document,
							doc_Type: documentType
						}
				  };

		const paxInfo = {
			trav_ref: "0" + index,
			trav_type: type,
			given_name: name,
			surname: last_name,
			birth_date: `${birthdateYear}-${
				birthdateMonth.length == 1 ? 0 + birthdateMonth : birthdateMonth
			}-${birthdateDay.length == 1 ? 0 + birthdateDay : birthdateDay}`,
			gender: gender,
			code_frecuent: inputList ? [
				...inputList
			] : null
		};

		return {
			...paxInfo,
			...paxDocInfo
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


	const handleInputChange = (e, index) => {
		const { name, value } = e;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};
	
	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};
	
	const handleAddClick = () => {
		setInputList([...inputList, { airline: "", code: "" }]);
	};

	return (
		<div className="form-one">
			<Form
				layout="vertical"
				onBlur={() =>
					setFormsValue((prev) => ({
						...prev,
						person:
							prev.person == null
								? { [type + index]: { ...submitForm() } }
								: Object.assign(prev.person, {
										[type + index]: { ...submitForm() }
								  })
					}))
				}
			>
				<Row type="flex" gutter={16}>
					<Col span={24} sm={6}>
						<Form.Item label="Tipo de documento">
							<Select
								defaultValue={`${flightIsInter || isInter ? 'Pasaporte' : 'CC'}`}
								onChange={(value: string) =>
									setDocumentType(value)
								}
							>
								<Option value="CC">Cedula</Option>
								<Option value="TI">Tarjeta identidad</Option>
								<Option value="RC">Registro civil</Option>
								<Option value="Pasaporte">Pasaporte</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={24} sm={documentType != "Pasaporte" ? 18 : 8}>
						<Form.Item label="Documento de identidad">
							{getFieldDecorator("document", {
								rules: [
									{
										required: true,
										message:
											"Por favor ingrese su documento!"
									}
								],
								initialValue: null
							})(<Input />)}
						</Form.Item>
					</Col>
					{documentType == "Pasaporte" ? (
						<Col span={24} sm={10}>
							<Form.Item label="País de residencia">
								{getFieldDecorator("resident_country", {
									rules: [
										{
											required: true,
											message:
												"Por favor ingrese el país de residencia"
										}
									]
								})(
									<Select>
										{childrenCountries}
									</Select>
								)}
							</Form.Item>
						</Col>
					) : null}
				</Row>
				<Row type="flex" gutter={16}>
					{documentType == "Pasaporte" ? (
						<Col span={24} sm={10}>
							<Form.Item label="Fecha vencimiento documento">
								{getFieldDecorator("expire_date", {
									rules: [
										{
											required: true,
											message:
												"Por favor ingrese la fecha de vencimiento",
											validator: (rule, value, cb) => {
												if (!validateExpiredDate(value)) {
													cb(true);
												}
												return true;
											}
										}
									]
								})(<DatePicker className="input-date" />)}
							</Form.Item>
						</Col>
					) : null}
					<Col span={24} sm={documentType != "Pasaporte" ? 12 : 8}>
						<Form.Item label="Fecha de nacimiento">
							{getFieldDecorator("birthdate", {
								rules: [
									{
										required: true,
										message:
											"Por favor seleccione su fecha de nacimiento!"
									},
									{
										message:
											"La edad no corresponde con el tipo de persona.",
										validator: (rule, value, cb) => {
											if (!validateBirthDate(value)) {
												cb(true);
											}
											return true;
										}
									}
								],
								initialValue: null
							})(<DatePicker className="input-date" />)}
						</Form.Item>
					</Col>
					<Col span={24} sm={documentType != "Pasaporte" ? 12 : 6}>
						<Form.Item label="Género">
							<Select
								defaultValue="male"
								onChange={(value: string) => setGender(value)}
							>
								<Option value="male">Masculino</Option>
								<Option value="female">Femenino</Option>
								<Option value="other">Otro</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row type="flex" gutter={16}>
					<Col span={12}>
						<Form.Item label="Nombres">
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "Por favor ingrese su nombre!"
									}
								],
								initialValue: null
							})(<Input />)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Apellidos">
							{getFieldDecorator("last_name", {
								rules: [
									{
										required: true,
										message:
											"Por favor ingrese su apellido!"
									}
								],
								initialValue: null
							})(<Input />)}
						</Form.Item>
					</Col>
				</Row>
				<Row type="flex" gutter={16}>
					<Col span={24}>
						<label>Viajero frecuente</label>
						<div className="mv10"></div>
						<Form
							layout="vertical"
						>
							{inputList.map((x, i) => {
								return (
									<Form.Item>
										{getFieldDecorator("fc", {
											rules: [],
											initialValue: null
										})(
											<Row style={{
												display: 'flex',
												justifyContent: 'space-between'
											}}>
											<Col span={optionAirlines.length > 1 ? 8 : 11}>
												<Select
													onChange={e => handleInputChange({name: 'airline', value: e}, i)}
												>
													{getOptionsAirlines()}
												</Select>
											</Col>
											{!(optionAirlines.length > 1) && <Col span={2}/> }
											<Col span={optionAirlines.length > 1 ? 11 : 11}>
												<Input
													name="code"
													onChange={e => handleInputChange({ name: "code", value:  e.target.value }, i)}
												/>
											</Col>
											{optionAirlines.length > 1 && (
												<Col span={3}>
													<Row type="flex" justify="space-between" >
													{inputList.length !== 1 && inputList.length - 1 === i &&
													<Button 
														type="primary"
														icon="delete"
														onClick={() => handleRemoveClick(i)}
													>
													</Button>}
													{inputList.length - 1 === i && inputList.length < optionAirlines.length &&
													<Button
														icon="plus"
														onClick={handleAddClick}
													>
													</Button>}
													</Row>
											</Col>
											)}
										</Row>
									)}


									</Form.Item>
								);
							})}
						</Form>

					</Col>
				</Row>
			</Form>
		</div>
	);
};

const Person = Form.create<Props>({ name: "adult_one" })(PersonForm);
export default Person;

export interface Props {
	form: any;
	type: "ADT" | "CHD" | "INF";
	index: number;
	setFormsValue: any;
}
