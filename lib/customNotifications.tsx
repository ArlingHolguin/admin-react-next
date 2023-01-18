import { notification, Button } from "antd";

export default class Notification {
	constructor() {
		notification.config({
			duration: 3,
			placement: "topRight"
		});
	}

	public Success(message: string, description: string) {
		notification.success({ message, description, duration: 15 });
	}

	public Error(message: string, description: string) {
		notification.open({
			message,
			description,
			duration: 15,
			type: "error",
			btn: this.openErrorPage(),
			key: `open${Date.now()}`
		});
	}

	public Info(message: string, description: any, duration: number = 10) {
		notification.info({ message, description, duration: duration });
	}

	private openErrorPage() {
		return (
			<Button type="primary" size="small">
				¿Quieres reportar este problema?
			</Button>
		);
	}
}
