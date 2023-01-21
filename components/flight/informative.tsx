import { Row, Button, Col, Icon } from "antd";
import Search from "../search/search";
import "../../assets/components/flight/informative.less";
import "../../assets/global.less";
import { useState } from "react";
import { ICity } from "../../models/city.model";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const InformativeFlight = (props) => {
	const [search, setSearch] = useState(false);
	const slug = props.slug;

	const buildCityFlight = (citySlug) => {
		if (citySlug) {
			const cityFlight = cityByCode(citySlug) || cityByName(citySlug);
			const cityName = cityFlight ? cityFlight.ciudad : "" ;
			return cityName;
		}
	};

	const buildDateFlight = (date: string) => {
		if (date == "null") return "";
		const fecha = moment(date).format("ddd MMM D");
		return fecha;
	};

	/**
	 * Obtener ciudad por codigo
	 */
	const cityByCode = (code): ICity => {
		const data = props.data;
		const filtered = data.iata.filter((item) => item.codigo === code)[0];
		if (filtered) {
			const city: ICity = {
				codigo: filtered.codigo,
				ciudad: filtered.ciudad,
				pais: filtered.pais
			};
			return city;
		}
	};

	/**
	 * Obtener ciudad por nombre
	 */
	 const cityByName = (name): ICity => {
		const data = props.data;
		const filtered = data.iata.filter((item) => item.ciudad.toLowerCase() === name.toLowerCase())[0];
		if (filtered) {
			const city: ICity = {
				codigo: filtered.codigo,
				ciudad: filtered.ciudad,
				pais: filtered.pais
			};
			return city;
		}
	};

	const flightDeparture = buildCityFlight(slug[1]);
	const flightReturn = buildCityFlight(slug[2]);
	const date = buildDateFlight(slug[3]);
	const dateReturn = buildDateFlight(slug[4]);
	const persons = parseInt(slug[5]) + parseInt(slug[6]) + parseInt(slug[7]);

	return (
		<div className="informative">
			<Row type="flex" className="rowInformative">
				<Row>
					<h1 style={{color: '#fff', fontSize: '1.2em', padding: '15px 0'}} >Vuelos baratos con tiquetesytiquetes</h1>
				</Row>
				<Row
					type="flex"
					align="bottom"
					style={{ width: "100%" }}
					justify="space-between"
					gutter={[16, 16]}
				>
					<Col
						lg={5}
						md={6}
						sm={12}
						xs={12}
						className="startInformative"
					>
						<p className="icon">
							<img src="/static/img/avion_ida.png" />
							<span>{flightDeparture}</span>
						</p>
					</Col>
					<Col
						lg={5}
						md={6}
						sm={12}
						xs={12}
						className="startInformative"
					>
						<p className="icon">
							<img src="/static/img/avion_regreso.png" />
							<span>{flightReturn}</span>
						</p>
					</Col>
					<Col lg={5} md={6} sm={12} xs={12}>
						<Row type="flex" align="bottom">
							<img
								style={{ marginRight: 16 }}
								src="/static/img/calendar.png"
							/>
							<p className="icon">
								{date}
								<br />
								{dateReturn}
							</p>
						</Row>
					</Col>
					<Col lg={4} md={6} sm={12} xs={12}>
						<Row type="flex" align="bottom">
							<p className="icon">
								<img src="/static/img/user.png" />
								<span>{persons} personas</span>
							</p>
						</Row>
					</Col>
					<Col lg={5} md={24} sm={24} xs={24}>
						<Row type="flex" justify="center" align="bottom">
							<Button
								className="btnVuelo"
								type="primary"
								onClick={() => setSearch(!search)}
							>
								BUSCAR OTRO VUELO
							</Button>
						</Row>
					</Col>
				</Row>
			</Row>
			<Row className="search">
				{search ? <Search data={props.data} /> : null}
			</Row>
		</div>
	);
};

export default InformativeFlight;
