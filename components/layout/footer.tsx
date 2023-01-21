import { useState } from 'react';
import {Row, Col, Button, Modal } from "antd";
import Link from "next/link";
import "./footer.less";
import "../../assets/global.less";
import AboutUs from "../ourCompany/aboutUs";
import PrivacyPolicy from '../ourCompany/privacyPolicy';
import Terms from '../../pages/terms';
import RetractionLaw from '../ourCompany/retractionLaw';

const Footer = () => {
	const [showModal, setShowModal] = useState(false)
	const [modalInfo, setModalInfo] = useState("")

	const switchModalInfo = () => {
		switch (modalInfo) {
			case 'about':
				return <AboutUs />
			case 'privacy':
				return <PrivacyPolicy />
			case 'terms':
				return <Terms />
			case 'retraction':
				return <RetractionLaw />
			default:
				return <></>
		}
	}

	const handleAouCompanyClick = (info) => {
		setModalInfo(info)
		setShowModal(true)
	}

	return (
		<Row
			type="flex"
			justify="center"
			style={{
				backgroundColor: "#9FA1A4",
				width: "100%",
				color: "white"
			}}
		>
			<Modal
				title="Nuestra Empresa"
				visible={showModal}
				onCancel={() => setShowModal(!showModal)}
				onOk={() => setShowModal(!showModal)}
				cancelButtonProps={{ disabled: true } }
				width="60%"
				bodyStyle={{
					height: '500px',
					overflowY: 'scroll'
				}}
			>
				{switchModalInfo()}	
			</Modal>
			<div style={{ paddingTop: 16 }} className="margin">
				<Row
					type="flex"
					justify="space-between"
					align="top"
					className="rowFooter"
				>
					<Col lg={12} md={7} sm={12} xs={12}>
						<Row type="flex" className="our-company" justify="start" style={{flexDirection: 'column'}}>
							<p><strong>Nuestra Empresa</strong></p>
							<Row  type="flex" justify="start" style={{width: '100%'}}>
								<ul className="list-no-decorate" style={{ paddingRight: "25px" }}>
									<li className="pointer p3" onClick={() => handleAouCompanyClick("about")}>Acerca de nosotros</li>
									<li className="pointer p3" onClick={() => handleAouCompanyClick("privacy")}>Politica de privacidad</li>
									<li className="pointer p3"><a className="fw" href="/sostenibilidad">Sostenibilidad</a></li>
								</ul>
								<ul className="list-no-decorate" style={{ paddingRight: "25px" }}>
									<li className="pointer p3" onClick={() => handleAouCompanyClick("terms")}>Terminos y condiciones</li>
									<li className="pointer p3" onClick={() => handleAouCompanyClick("retraction")} >Ley de retracto</li>

								</ul>
								<ul className="list-no-decorate">
									<li className="pointer p3"><a className="fw" href="https://www.sic.gov.co/" target="_blank">SIC</a></li>
									<li className="pointer p3"><a className="fw" href="https://www.aerocivil.gov.co/" target="_blank">Aerocivil</a></li>
								</ul>
							</Row>
						</Row>
						<Row type="flex" justify="start">
							<img
								style={{ width: "100%" }}
								src="/static/img/logo_blanco.svg"
							/>
						</Row>
					</Col>
					<Col lg={6} md={0} sm={0} xs={0}>
						<Row type="flex" justify="end">
							{/* <Button className="weight" type="link">Hoteles</Button> */}
							<Link href="/">
								<Button className="weight" type="link">
									Vuelos
								</Button>
							</Link>
							<Link href="/">
								<Button className="weight" type="link">
									Planes
								</Button>
							</Link>
							{/* <Button className="weight" type="link">Promociones</Button> */}
							<Button
								href="/contactenos"
								className="weight"
								type="link"
							>
								Contáctenos
							</Button>
						</Row>
					</Col>
					<Col lg={5} md={9} sm={9} xs={9} className="dataFooter">
						<div style={{ margin: 0 }}>Contáctanos tiquetes</div>
						<div className="phones-wrap">
							<p className="no-margin">(+57) 2 486 55 50</p>
							<p className="no-margin">(+57)1 390 50 74</p>
						</div>
					</Col>
				</Row>
				<Row type="flex" className="bottomNet" style={{}}>
					<Col lg={17} md={17} sm={0} xs={0}>
						<p style={{ fontSize: 14 }}>
							SITIO WEB DE RYC EUROAMERICAN TRAVEL SAS | NIT:
							805021793-2 | RNT: 6999 Av 6 BIS 25N 22 | Colombia -
							Cali
						</p>
						<p style={{ fontSize: 11, lineHeight: 1.2 }}>
							En desarrollo de lo dispuesto en el artículo 17 de
							la ley 679 de 2001, la agencia advierte al turista
							que la explotación y el abuso sexual de los menores
							de edad en el país son sancionados penal y
							administrativamente, conforme a las leyes
							Colombianas.Cumple la Ley 17 de 1981 y Res. 1367 de
							2000 contra la comercialización y tráfico de
							especies de fauna y flora silvestre. Rechaza la
							comercialización y tráfico ilegal de bienes
							culturales regionales y nacionales, Ley 103 de 1991
							y su decreto 904 de 1941, Ley 397 de 1997 y su
							decreto 833 de 2002, Ley 1185 de 2008. Protege los
							espacios libres de humo Ley 1335 de 2009. Rechaza la
							discriminación o actos de racismo a la población
							vulnerable Ley 1752 de 2015 y Ley 1482 de 2011. Los
							datos personales que se han recogido por medio de
							este canal serán tratados de conformidad con lo
							establecidoen la Ley 1581 de 2012.Todos los derechos
							reservados.
						</p>
					</Col>
					<Col lg={7} md={7} sm={24} xs={24}>
						<Row
							type="flex"
							justify="end"
							style={{ marginTop: 32 }}
						>
							<Button
								className="btnRedFooter"
								target="_blank"
								href="https://twitter.com/tytpuntocom"
								shape="circle"
								icon="twitter"
								ghost
							/>
							<Button
								className="btnRedFooter"
								target="_blank"
								href="https://www.facebook.com/TiquetesyTiquetes"
								shape="circle"
								icon="facebook"
								ghost
							/>
							<Button
								className="btnRedFooter"
								target="_blank"
								href="https://www.instagram.com/tiquetesytiquetes"
								shape="circle"
								icon="instagram"
								ghost
							/>
							<Button
								className="btnRedFooter"
								target="_blank"
								href="https://www.youtube.com/channel/UCiN81KfDhvSUkbX0jEAD1Gw"
								shape="circle"
								icon="youtube"
								ghost
							/>
						</Row>
						<Row type="flex" justify="end">
							<img src="/static/img/logos.png" />
						</Row>
					</Col>
				</Row>
			</div>
		</Row>
	);
};
export default Footer;
