import PageHeader from "antd/lib/page-header";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import Link from "next/link";
import { useState } from "react";
import "../../assets/global.less";
import "./header.less";

const Header = ({ handleContactClick = null }) => {
	const [brume, setBrume] = useState(false);

	return (
		<div className="margin">
			<div className="brume"
				style={{ display: brume ? "block" : "none" }}>
				<Button
					type="link"
					className="btnClose"
					onClick={() => setBrume(!brume)}>
					<Icon type="close" className="iconClose" />
				</Button>
			</div>
			<PageHeader title="" className="header">
				<Row type="flex" align="bottom" justify="space-between">
					{/* <Col span={2} className="middle">
                        <Button type="link" className="menu" onClick={() => setBrume(!brume)}>
                            <img src="/static/img/menu.svg" style={{ width: 35 }} />
                            <p>Menu</p>
                        </Button>
                    </Col> */}
					<Col lg={10} md={10} sm={21} xs={21}>
						<a href="/">
							<img
								className="imgLogo"
								src="/static/img/logo.png"
							/>
						</a>
					</Col>
					<Col
						lg={4}
						md={4}
						xs={0}
						sm={0}
						className="middle responsive"
					>
						<Row type="flex" justify="end">
							<Col>
								{handleContactClick ? (
									<Button
										onClick={handleContactClick}
										type="link"
									>
										Contáctenos
									</Button>
								) : (
									<Link href="/contactenos">
										<Button type="link">Contáctenos</Button>
									</Link>
								)}
							</Col>
						</Row>
					</Col>
					<Col
						lg={4}
						md={0}
						xs={0}
						sm={0}
						className="middle responsive"
					>
						<Row type="flex" justify="end" gutter={[5, 5]}>
							<Col>
								<Button
									target="_blank"
									href="https://twitter.com/tytpuntocom"
									type="primary"
									shape="circle"
									icon="twitter"
								/>
							</Col>
							<Col>
								<Button
									target="_blank"
									href="https://www.facebook.com/TiquetesyTiquetes"
									type="primary"
									shape="circle"
									icon="facebook"
								/>
							</Col>
							<Col>
								<Button
									target="_blank"
									href="https://www.instagram.com/tiquetesytiquetes"
									type="primary"
									shape="circle"
									icon="instagram"
								/>
							</Col>
							<Col>
								<Button
									target="_blank"
									href="https://www.youtube.com/channel/UCiN81KfDhvSUkbX0jEAD1Gw"
									type="primary"
									shape="circle"
									icon="youtube"
								/>
							</Col>
						</Row>
					</Col>
					{/* <Col lg={3} md={3} sm={3} xs={0} className="responsive">
                        <Row type="flex" justify="end" align="middle" style={{ height: 56 }}>

                            <Button icon="user" shape="round">
                                Login
                            </Button>
                        </Row>
                    </Col> */}
				</Row>
			</PageHeader>
		</div>
	);
};

export default Header;
