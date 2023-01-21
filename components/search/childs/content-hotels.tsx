import { useState } from "react";
import moment from "moment";
import { Row, Col, AutoComplete, DatePicker, Select, Button } from "antd";
import autocompleteCore from "./autocomplete";
import Emoji from "../../share/Emoji";
const { Option } = AutoComplete;

const ContentHoteles = (props) => {
	const [result, setResult] = useState([]);
	const [startValue, setStartValue] = useState(moment(new Date()));
	const [endValue, setEndValue] = useState(null);
	const [endOpen, setEndOpen] = useState(false);

	/**
	 * Manejo de busquedas autocompletar
	 * @param {*} value
	 */

	const handleSearch = (value) => {
		let resultSearch;
		if (!value || value.indexOf("@") >= 0) {
			resultSearch = [];
		} else {
			if (value.length > 1 && value.length <= 3) {
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
		<Option
			key={item.codigo}
			value={item.codigo + " " + item.ciudad + " " + item.pais}
		>
			<Emoji data={item.bandera} /> {item.ciudad} - {item.pais} -{" "}
			{item.codigo}
		</Option>
	));

	/**
	 * Manejo de dias
	 */

	const disabledEndDate = (endValue) => {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	const disabledStartDate = (startValue) => {
		return startValue.valueOf() < moment(new Date());
	};

	const onStartChange = (value) => {
		setStartValue(value);
	};

	const onEndChange = (value) => {
		if (startValue) {
			setEndValue(value);
		} else {
			alert("Debes seleccionar un dia de inicio");
		}
	};

	const handleStartOpenChange = (open) => {
		if (!open) {
			setEndOpen(true);
		}
	};

	const handleEndOpenChange = (open) => {
		setEndOpen(open);
	};

	return (
		<div>
			<Row type="flex" justify="space-between">
				<Col lg={6} md={12} sm={24} xs={24}>
					<h3 style={{ color: "white" }}>
						Destino / Nombre del hotel
					</h3>
					<AutoComplete
						style={{ width: "100%" }}
						onSearch={handleSearch}
						placeholder="Ej. Ciudad, región, zona o nombre de hotel"
						optionLabelProp="text"
					>
						{children}
					</AutoComplete>
				</Col>
				<Col lg={4} md={5} sm={11} xs={11}>
					<h3 style={{ color: "white" }}>Salida</h3>
					<DatePicker
						style={{ width: "100%", minWidth: "100%" }}
						disabledDate={disabledStartDate}
						showTime
						format="YYYY-MM-DD"
						value={startValue}
						placeholder="Salida"
						onChange={onStartChange}
						onOpenChange={handleStartOpenChange}
					/>
				</Col>
				<Col lg={4} md={5} sm={11} xs={11}>
					<h3 style={{ color: "white" }}>Regreso</h3>
					<DatePicker
						style={{ width: "100%", minWidth: "100%" }}
						disabledDate={disabledEndDate}
						showTime
						format="YYYY-MM-DD"
						value={endValue}
						placeholder="Regreso"
						onChange={onEndChange}
						open={endOpen}
						onOpenChange={handleEndOpenChange}
					/>
				</Col>
				<Col lg={5} md={12} sm={11} xs={24}>
					<Row type="flex" justify="space-between">
						<Col span={7}>
							<h4 style={{ color: "white", height: 26 }}>
								Adultos
							</h4>
							<Select defaultValue="1" style={{ width: "100%" }}>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
								<Option value="5">5</Option>
								<Option value="6">6</Option>
								<Option value="6">7</Option>
								<Option value="6">8</Option>
								<Option value="6">9</Option>
							</Select>
						</Col>
						<Col span={7}>
							<h4 style={{ color: "white", height: 26 }}>
								Niños 12
							</h4>
							<Select defaultValue="0" style={{ width: "100%" }}>
								<Option value="0">0</Option>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
								<Option value="5">5</Option>
								<Option value="6">6</Option>
								<Option value="6">7</Option>
								<Option value="6">8</Option>
								<Option value="6">9</Option>
							</Select>
						</Col>
						<Col span={7}>
							<h4 style={{ color: "white", height: 26 }}>
								Infantes 2
							</h4>
							<Select defaultValue="0" style={{ width: "100%" }}>
								<Option value="0">0</Option>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
								<Option value="5">5</Option>
								<Option value="6">6</Option>
								<Option value="6">7</Option>
								<Option value="6">8</Option>
								<Option value="6">9</Option>
							</Select>
						</Col>
					</Row>
				</Col>

				<Col lg={4} md={11} sm={11} xs={24}>
					<h3 style={{ color: "white" }}>No de habitaciones</h3>
					<Select style={{ width: "100%" }} placeholder="Total">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
						<Option value="4">4</Option>
						<Option value="5">5</Option>
						<Option value="6">6</Option>
					</Select>
				</Col>
			</Row>
			<Row type="flex" justify="end" style={{ marginTop: 16 }}>
				<Button type="primary" size="large">
					Buscar Hotel
				</Button>
			</Row>
		</div>
	);
};
export default ContentHoteles;
