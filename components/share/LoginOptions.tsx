import { Row, Col, Button } from "antd";

const LoginButton = () => {
	return (
		<Row className="login">
			<p>
				Inicia sesión para acceder a todos los beneficios de ser un
				viajero Tiquetes y Tiquetes
			</p>
			<Row type="flex" justify="space-between">
				<Col span={8}>
					<Button className="btn-login">
						<img src="/static/img/info-passengers/facebook.svg"></img>
						<span>Facebook</span>
					</Button>
				</Col>
				<Col span={8}>
					<Button className="btn-login">
						<img src="/static/img/info-passengers/google.svg"></img>
						<span>Google</span>
					</Button>
				</Col>
				<Col span={8}>
					<Button className="btn-login">
						<img src="/static/img/info-passengers/mail.svg"></img>
						<span>Email</span>
					</Button>
				</Col>
			</Row>
		</Row>
	);
};

export default LoginButton;
