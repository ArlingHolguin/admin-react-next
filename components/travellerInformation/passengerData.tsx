import { Collapse } from "antd";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import Notification from "../../lib/customNotifications";
import Person from "../forms/person";

const { Panel } = Collapse;
const notification = new Notification();

const PassengerData = ({ setFormsValue }) => {
	const [activeKey, setActiveKey] = useState("adult_1");
	const [passenger, setPassenger] = useLocalStorage("passenger", {
		adults: 1,
		children: 0,
		babies: 0
	});

	return (
		<>
			<h3>Datos de los pasajeros</h3>
			<p>
				Asegúrate de ingresar los datos tal como aparecen en el
				documento de viaje
			</p>

			<Collapse
				activeKey={activeKey}
				onChange={(key) => setActiveKey(key[key.length - 1])}
				style={{ marginTop: 16 }}
				expandIconPosition="right"
				defaultActiveKey="adult_1"
				expandIcon={({ isActive }) =>
					isActive ? (
						<img src="/static/img/accordeon_top.png" />
					) : (
						<img src="/static/img/accordeon_down.png" />
					)
				}
			>
				{Array.from(
					{ length: parseInt(passenger.adults) },
					(v, i) => i + 1
				).map((item) => (
					<Panel
						header={
							<p className="collapse-header-text">
								ADULTO {item}
							</p>
						}
						key={"adult_" + item}
					>
						<Person
							type="ADT"
							index={item}
							setFormsValue={setFormsValue}
						/>
					</Panel>
				))}

				{Array.from(
					{ length: parseInt(passenger.children) },
					(v, i) => i + 1
				).map((item) => (
					<Panel
						header={
							<p className="collapse-header-text">NIÑO {item}</p>
						}
						key={`children_${item + Number(passenger.adults)}`}
					>
						<Person
							type="CHD"
							index={item + Number(passenger.adults)}
							setFormsValue={setFormsValue}
						/>
					</Panel>
				))}
				{Array.from(
					{ length: parseInt(passenger.babies) },
					(v, i) => i + 1
				).map((item) => (
					<Panel
						header={
							<p className="collapse-header-text">
								INFANTE {item}
							</p>
						}
						key={`baby_${
							item +
							Number(passenger.adults) +
							Number(passenger.children)
						}`}
					>
						<Person
							type="INF"
							index={
								item +
								Number(passenger.adults) +
								Number(passenger.children)
							}
							setFormsValue={setFormsValue}
						/>
					</Panel>
				))}
			</Collapse>
		</>
	);
};

export default PassengerData;
